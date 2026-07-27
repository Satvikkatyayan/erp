"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartReviewHandler = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../common/prisma/prisma.service");
const event_bus_service_1 = require("../../../../core/events/event-bus.service");
const attendance_state_machine_service_1 = require("../../services/attendance-state-machine.service");
const attendance_lifecycle_events_1 = require("../../events/attendance-lifecycle.events");
const client_1 = require("@prisma/client");
const attendance_review_service_1 = require("../../services/attendance-review.service");
let StartReviewHandler = class StartReviewHandler {
    constructor(prisma, stateMachine, eventBus, reviewService) {
        this.prisma = prisma;
        this.stateMachine = stateMachine;
        this.eventBus = eventBus;
        this.reviewService = reviewService;
    }
    async execute(command) {
        return this.prisma.$transaction(async (tx) => {
            const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
            if (!muster)
                throw new common_1.BadRequestException('Muster not found');
            const fromState = muster.workflowStatus;
            const toState = client_1.MusterWorkflowStatus.UNDER_REVIEW;
            this.stateMachine.validateTransition({
                from: fromState,
                to: toState,
                actorId: command.actorId,
                actorRoles: command.actorRoles
            });
            const updatedMuster = await tx.dailySiteMuster.update({
                where: { id: command.musterId },
                data: { workflowStatus: toState }
            });
            await this.reviewService.startReviewProcess(command.musterId, command.correlationId, tx);
            await tx.musterTimeline.create({
                data: {
                    musterId: command.musterId,
                    action: 'AttendanceReviewStarted',
                    actorId: command.actorId,
                    timestamp: new Date(),
                    reason: command.reason,
                    previousState: fromState,
                    currentState: toState,
                    version: 1
                }
            });
            this.eventBus.publish(new attendance_lifecycle_events_1.AttendanceLifecycleEvent('AttendanceReviewStarted', command.correlationId, {
                musterId: command.musterId,
                actorId: command.actorId,
                fromState,
                toState,
                reason: command.reason
            }));
            return updatedMuster;
        });
    }
};
exports.StartReviewHandler = StartReviewHandler;
exports.StartReviewHandler = StartReviewHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_state_machine_service_1.AttendanceStateMachine,
        event_bus_service_1.EventBusService,
        attendance_review_service_1.AttendanceReviewService])
], StartReviewHandler);
//# sourceMappingURL=start-review.handler.js.map