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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OperationalExceptionOrchestrator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationalExceptionOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../common/prisma/prisma.service");
const event_bus_service_1 = require("../../../../core/events/event-bus.service");
const client_1 = require("@prisma/client");
const attendance_exception_events_1 = require("../../events/attendance-exception.events");
const attendance_health_service_1 = require("../attendance-health.service");
let OperationalExceptionOrchestrator = OperationalExceptionOrchestrator_1 = class OperationalExceptionOrchestrator {
    constructor(prisma, eventBus, healthService, detectors) {
        this.prisma = prisma;
        this.eventBus = eventBus;
        this.healthService = healthService;
        this.detectors = detectors;
        this.logger = new common_1.Logger(OperationalExceptionOrchestrator_1.name);
    }
    async runDetection(musterId, correlationId) {
        return this.prisma.$transaction(async (tx) => {
            this.logger.log(`Running operational exception detection for Muster ${musterId}`);
            const allResults = [];
            for (const detector of this.detectors) {
                try {
                    const results = await detector.detect(musterId, tx);
                    results.forEach(r => allResults.push({ ...r, detectedBy: detector.identifier }));
                }
                catch (error) {
                    this.logger.error(`Detector ${detector.identifier} failed: ${error.message}`);
                }
            }
            if (allResults.length === 0)
                return;
            const existingExceptions = await tx.attendanceException.findMany({
                where: { musterId, status: { notIn: [client_1.AttendanceExceptionStatus.RESOLVED, client_1.AttendanceExceptionStatus.DISMISSED] } }
            });
            const newExceptionsData = allResults.filter(result => {
                const isDuplicate = existingExceptions.some(e => e.exceptionType === result.exceptionType &&
                    e.employeeId === result.employeeId);
                return !isDuplicate;
            });
            if (newExceptionsData.length === 0)
                return;
            const createdExceptions = await Promise.all(newExceptionsData.map(data => tx.attendanceException.create({
                data: {
                    musterId,
                    attendanceDayId: data.attendanceDayId,
                    employeeId: data.employeeId,
                    exceptionType: data.exceptionType,
                    severity: data.severity,
                    priority: data.priority,
                    description: data.description,
                    recommendedAction: data.recommendedAction,
                    detectedBy: data.detectedBy,
                    status: client_1.AttendanceExceptionStatus.OPEN
                }
            })));
            for (const exc of createdExceptions) {
                await tx.musterTimeline.create({
                    data: {
                        musterId,
                        action: 'ExceptionDetected',
                        timestamp: new Date(),
                        reason: exc.description,
                        severity: exc.severity,
                        currentState: client_1.AttendanceExceptionStatus.OPEN,
                        version: 1
                    }
                });
                this.eventBus.publish(new attendance_exception_events_1.AttendanceExceptionEvent('AttendanceExceptionDetected', correlationId, {
                    exceptionId: exc.id,
                    musterId: exc.musterId,
                    type: exc.exceptionType,
                    severity: exc.severity
                }));
            }
            await this.healthService.updateMusterHealth(musterId, correlationId, tx);
        });
    }
    async resolveException(exceptionId, actorId, resolutionNotes, correlationId) {
        return this.prisma.$transaction(async (tx) => {
            const exc = await tx.attendanceException.findUnique({ where: { id: exceptionId } });
            if (!exc)
                throw new Error("Exception not found");
            if (exc.status === client_1.AttendanceExceptionStatus.RESOLVED)
                return exc;
            const updated = await tx.attendanceException.update({
                where: { id: exceptionId },
                data: {
                    status: client_1.AttendanceExceptionStatus.RESOLVED,
                    resolvedAt: new Date(),
                    resolvedBy: actorId,
                    resolutionNotes
                }
            });
            await tx.musterTimeline.create({
                data: {
                    musterId: exc.musterId,
                    action: 'ExceptionResolved',
                    actorId,
                    timestamp: new Date(),
                    reason: resolutionNotes,
                    severity: exc.severity,
                    previousState: exc.status,
                    currentState: client_1.AttendanceExceptionStatus.RESOLVED,
                    version: 1
                }
            });
            this.eventBus.publish(new attendance_exception_events_1.AttendanceExceptionEvent('AttendanceExceptionResolved', correlationId, {
                exceptionId: exc.id,
                musterId: exc.musterId,
                type: exc.exceptionType,
                severity: exc.severity,
                actorId
            }));
            await this.healthService.updateMusterHealth(exc.musterId, correlationId, tx);
            return updated;
        });
    }
    async hasUnresolvedCriticalExceptions(musterId, prismaTx) {
        const db = prismaTx || this.prisma;
        const count = await db.attendanceException.count({
            where: {
                musterId,
                severity: client_1.AttendanceExceptionSeverity.CRITICAL,
                status: { notIn: [client_1.AttendanceExceptionStatus.RESOLVED, client_1.AttendanceExceptionStatus.DISMISSED] }
            }
        });
        return count > 0;
    }
};
exports.OperationalExceptionOrchestrator = OperationalExceptionOrchestrator;
exports.OperationalExceptionOrchestrator = OperationalExceptionOrchestrator = OperationalExceptionOrchestrator_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('EXCEPTION_DETECTORS')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_bus_service_1.EventBusService,
        attendance_health_service_1.AttendanceHealthService, Array])
], OperationalExceptionOrchestrator);
//# sourceMappingURL=operational-exception.orchestrator.js.map