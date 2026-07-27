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
exports.AttendanceReviewService = exports.REVIEW_ROLES_ORDER = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const client_1 = require("@prisma/client");
const attendance_review_events_1 = require("../events/attendance-review.events");
exports.REVIEW_ROLES_ORDER = ['HR', 'COORDINATOR', 'VC', 'OWNER'];
let AttendanceReviewService = class AttendanceReviewService {
    constructor(prisma, eventBus) {
        this.prisma = prisma;
        this.eventBus = eventBus;
    }
    async startReviewProcess(musterId, correlationId, prismaTx) {
        const db = prismaTx || this.prisma;
        const reviews = exports.REVIEW_ROLES_ORDER.map(role => ({
            musterId,
            reviewerId: '00000000-0000-0000-0000-000000000000',
            role,
            status: client_1.AttendanceReviewStatus.PENDING
        }));
        await db.attendanceReview.createMany({ data: reviews });
        this.eventBus.publish(new attendance_review_events_1.AttendanceReviewEvent('AttendanceReviewStarted', correlationId, { musterId }));
    }
    async recordDecision(musterId, reviewerId, reviewerRole, decision, remarks, correlationId, prismaTx) {
        const db = prismaTx || this.prisma;
        const reviews = await db.attendanceReview.findMany({
            where: { musterId },
            orderBy: { createdAt: 'asc' }
        });
        if (reviews.length === 0) {
            throw new common_1.BadRequestException('Review process not started for this muster.');
        }
        const currentReviewIndex = exports.REVIEW_ROLES_ORDER.indexOf(reviewerRole);
        if (currentReviewIndex === -1)
            throw new common_1.BadRequestException('Invalid reviewer role.');
        for (let i = 0; i < currentReviewIndex; i++) {
            const prerequisiteRole = exports.REVIEW_ROLES_ORDER[i];
            const prerequisiteReview = reviews.find(r => r.role === prerequisiteRole);
            if (!prerequisiteReview || prerequisiteReview.status !== client_1.AttendanceReviewStatus.APPROVED) {
                throw new common_1.BadRequestException(`Cannot review. Pending approval from ${prerequisiteRole}.`);
            }
        }
        const reviewToUpdate = reviews.find(r => r.role === reviewerRole);
        if (!reviewToUpdate) {
            throw new common_1.BadRequestException(`Review assignment not found for role ${reviewerRole}.`);
        }
        if (reviewToUpdate.status === client_1.AttendanceReviewStatus.APPROVED || reviewToUpdate.status === client_1.AttendanceReviewStatus.REJECTED) {
            throw new common_1.BadRequestException('Review decision already recorded.');
        }
        await db.attendanceReview.update({
            where: { id: reviewToUpdate.id },
            data: {
                reviewerId,
                status: decision,
                remarks,
                reviewedAt: new Date()
            }
        });
        const eventName = decision === client_1.AttendanceReviewStatus.APPROVED ? 'AttendanceReviewCompleted' :
            decision === client_1.AttendanceReviewStatus.REJECTED ? 'AttendanceReviewRejected' :
                decision === client_1.AttendanceReviewStatus.RETURNED ? 'AttendanceReviewReturned' : null;
        if (eventName) {
            this.eventBus.publish(new attendance_review_events_1.AttendanceReviewEvent(eventName, correlationId, { musterId, reviewerId, role: reviewerRole, decision, remarks }));
        }
        if (decision === client_1.AttendanceReviewStatus.APPROVED && reviewerRole === exports.REVIEW_ROLES_ORDER[exports.REVIEW_ROLES_ORDER.length - 2]) {
            this.eventBus.publish(new attendance_review_events_1.AttendanceReviewEvent('AttendanceFinalReviewEligible', correlationId, { musterId }));
        }
    }
    async isEligibleForFinalLock(musterId, prismaTx) {
        const db = prismaTx || this.prisma;
        const reviews = await db.attendanceReview.findMany({ where: { musterId } });
        const mandatoryRoles = exports.REVIEW_ROLES_ORDER.slice(0, -1);
        for (const role of mandatoryRoles) {
            const r = reviews.find(rv => rv.role === role);
            if (!r || r.status !== client_1.AttendanceReviewStatus.APPROVED)
                return false;
        }
        return true;
    }
};
exports.AttendanceReviewService = AttendanceReviewService;
exports.AttendanceReviewService = AttendanceReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_bus_service_1.EventBusService])
], AttendanceReviewService);
//# sourceMappingURL=attendance-review.service.js.map