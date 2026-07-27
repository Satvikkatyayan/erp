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
exports.LockAttendanceHandler = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../common/prisma/prisma.service");
const event_bus_service_1 = require("../../../../core/events/event-bus.service");
const attendance_state_machine_service_1 = require("../../services/attendance-state-machine.service");
const attendance_lifecycle_events_1 = require("../../events/attendance-lifecycle.events");
const client_1 = require("@prisma/client");
const attendance_review_service_1 = require("../../services/attendance-review.service");
const operational_exception_orchestrator_1 = require("../../services/exceptions/operational-exception.orchestrator");
let LockAttendanceHandler = class LockAttendanceHandler {
    constructor(prisma, stateMachine, eventBus, reviewService, exceptionOrchestrator) {
        this.prisma = prisma;
        this.stateMachine = stateMachine;
        this.eventBus = eventBus;
        this.reviewService = reviewService;
        this.exceptionOrchestrator = exceptionOrchestrator;
    }
    async execute(command) {
        return this.prisma.$transaction(async (tx) => {
            const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
            if (!muster)
                throw new common_1.BadRequestException('Muster not found');
            const fromState = muster.workflowStatus;
            const toState = client_1.MusterWorkflowStatus.LOCKED;
            this.stateMachine.validateTransition({
                from: fromState,
                to: toState,
                actorId: command.actorId,
                actorRoles: command.actorRoles
            });
            const isEligible = await this.reviewService.isEligibleForFinalLock(command.musterId, tx);
            if (!isEligible && fromState === client_1.MusterWorkflowStatus.UNDER_REVIEW) {
                throw new common_1.BadRequestException('Cannot lock. Final review eligibility not met.');
            }
            const hasCriticalExceptions = await this.exceptionOrchestrator.hasUnresolvedCriticalExceptions(command.musterId, tx);
            if (hasCriticalExceptions) {
                throw new common_1.BadRequestException('Cannot lock attendance. There are unresolved critical exceptions.');
            }
            const updatedMuster = await tx.dailySiteMuster.update({
                where: { id: command.musterId },
                data: { workflowStatus: toState }
            });
            await tx.musterTimeline.create({
                data: {
                    musterId: command.musterId,
                    action: 'AttendanceLocked',
                    actorId: command.actorId,
                    timestamp: new Date(),
                    reason: command.reason,
                    previousState: fromState,
                    currentState: toState,
                    version: 1
                }
            });
            this.eventBus.publish(new attendance_lifecycle_events_1.AttendanceLifecycleEvent('AttendanceLocked', command.correlationId, {
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
exports.LockAttendanceHandler = LockAttendanceHandler;
exports.LockAttendanceHandler = LockAttendanceHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_state_machine_service_1.AttendanceStateMachine,
        event_bus_service_1.EventBusService,
        attendance_review_service_1.AttendanceReviewService,
        operational_exception_orchestrator_1.OperationalExceptionOrchestrator])
], LockAttendanceHandler);
//# sourceMappingURL=lock-attendance.handler.js.map