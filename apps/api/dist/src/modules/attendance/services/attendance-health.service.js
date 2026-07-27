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
var AttendanceHealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceHealthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const attendance_exception_events_1 = require("../events/attendance-exception.events");
const client_1 = require("@prisma/client");
let AttendanceHealthService = AttendanceHealthService_1 = class AttendanceHealthService {
    constructor(prisma, eventBus) {
        this.prisma = prisma;
        this.eventBus = eventBus;
        this.logger = new common_1.Logger(AttendanceHealthService_1.name);
    }
    async updateMusterHealth(musterId, correlationId, prismaTx) {
        const db = prismaTx || this.prisma;
        const exceptions = await db.attendanceException.findMany({
            where: { musterId, status: { notIn: [client_1.AttendanceExceptionStatus.RESOLVED, client_1.AttendanceExceptionStatus.DISMISSED] } }
        });
        const muster = await db.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: {
                snapshot: { include: { assignments: true } }
            }
        });
        if (!muster)
            return;
        const expected = muster.snapshot?.assignments.length || 0;
        const recorded = muster.attendanceRecorded;
        const pending = Math.max(0, expected - recorded);
        const completionPct = expected > 0 ? (recorded / expected) * 100 : 0;
        await db.dailySiteMuster.update({
            where: { id: musterId },
            data: {
                employeesExpected: expected,
                pendingAttendance: pending,
                completionPercentage: completionPct
            }
        });
        this.eventBus.publish(new attendance_exception_events_1.AttendanceHealthEvent('AttendanceHealthChanged', correlationId, {
            musterId,
            siteId: muster.siteId,
            completionPercentage: completionPct,
            pendingExceptions: exceptions.length
        }));
    }
};
exports.AttendanceHealthService = AttendanceHealthService;
exports.AttendanceHealthService = AttendanceHealthService = AttendanceHealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_bus_service_1.EventBusService])
], AttendanceHealthService);
//# sourceMappingURL=attendance-health.service.js.map