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
exports.CompleteReviewHandler = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../common/prisma/prisma.service");
const attendance_review_service_1 = require("../../services/attendance-review.service");
let CompleteReviewHandler = class CompleteReviewHandler {
    constructor(prisma, reviewService) {
        this.prisma = prisma;
        this.reviewService = reviewService;
    }
    async execute(command) {
        return this.prisma.$transaction(async (tx) => {
            const reviewerRole = command.actorRoles.find(r => ['HR', 'COORDINATOR', 'VC', 'OWNER'].includes(r));
            if (!reviewerRole)
                throw new common_1.BadRequestException('Actor does not have a valid review role.');
            await this.reviewService.recordDecision(command.musterId, command.actorId, reviewerRole, command.decision, command.remarks, command.correlationId, tx);
            await tx.musterTimeline.create({
                data: {
                    musterId: command.musterId,
                    action: 'AttendanceReviewAction',
                    actorId: command.actorId,
                    timestamp: new Date(),
                    reason: command.remarks,
                    previousState: 'UNDER_REVIEW',
                    currentState: 'UNDER_REVIEW',
                    version: 1
                }
            });
            return { success: true };
        });
    }
};
exports.CompleteReviewHandler = CompleteReviewHandler;
exports.CompleteReviewHandler = CompleteReviewHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_review_service_1.AttendanceReviewService])
], CompleteReviewHandler);
//# sourceMappingURL=complete-review.handler.js.map