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
exports.CreateDailySiteMusterCommandHandler = exports.CreateDailySiteMusterCommand = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const attendance_snapshot_service_1 = require("../services/attendance-snapshot.service");
const attendance_initialization_service_1 = require("../services/attendance-initialization.service");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const attendance_events_1 = require("../events/attendance.events");
const client_1 = require("@prisma/client");
class CreateDailySiteMusterCommand {
    constructor(siteId, projectId, musterDate, siteClerkId, tenantId = 'SYSTEM', organizationId = 'SYSTEM', correlationId = require('uuid').v4(), shiftId) {
        this.siteId = siteId;
        this.projectId = projectId;
        this.musterDate = musterDate;
        this.siteClerkId = siteClerkId;
        this.tenantId = tenantId;
        this.organizationId = organizationId;
        this.correlationId = correlationId;
        this.shiftId = shiftId;
    }
}
exports.CreateDailySiteMusterCommand = CreateDailySiteMusterCommand;
let CreateDailySiteMusterCommandHandler = class CreateDailySiteMusterCommandHandler {
    constructor(prisma, snapshotService, initService, eventBus) {
        this.prisma = prisma;
        this.snapshotService = snapshotService;
        this.initService = initService;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const { siteId, projectId, musterDate, siteClerkId, shiftId } = command;
        if (musterDate.getTime() > new Date().getTime() + 86400000) {
            throw new common_1.BadRequestException('Cannot create muster for future dates.');
        }
        return this.prisma.$transaction(async (tx) => {
            const existingMuster = await tx.dailySiteMuster.findFirst({
                where: {
                    siteId,
                    musterDate: {
                        gte: new Date(new Date(musterDate).setHours(0, 0, 0, 0)),
                        lt: new Date(new Date(musterDate).setHours(23, 59, 59, 999)),
                    }
                }
            });
            if (existingMuster) {
                throw new common_1.BadRequestException('Daily Site Muster already exists for this site and date.');
            }
            const muster = await tx.dailySiteMuster.create({
                data: {
                    siteId,
                    projectId,
                    musterDate: new Date(musterDate),
                    shiftId,
                    siteClerkId,
                    workflowStatus: client_1.MusterWorkflowStatus.DRAFT
                }
            });
            const snapshot = await this.snapshotService.createSnapshot(muster.id, siteId, projectId, musterDate, tx);
            await tx.dailySiteMuster.update({
                where: { id: muster.id },
                data: { snapshotId: snapshot.id }
            });
            const initializedMuster = await this.initService.initializeAggregate(muster.id, snapshot.snapshotData, shiftId || null, tx);
            await tx.musterTimeline.create({
                data: {
                    musterId: muster.id,
                    action: 'MUSTER_CREATED',
                    actorId: siteClerkId,
                    timestamp: new Date()
                }
            });
            this.eventBus.publish(new attendance_events_1.AttendanceSnapshotCreatedEvent(command.correlationId, {
                snapshotId: snapshot.id,
                musterId: muster.id,
                siteId,
                employeeCount: snapshot.snapshotData.length
            }));
            this.eventBus.publish(new attendance_events_1.DailyMusterCreatedEvent(command.correlationId, {
                musterId: muster.id,
                siteId,
                date: muster.musterDate,
                createdBy: siteClerkId
            }));
            return initializedMuster;
        });
    }
};
exports.CreateDailySiteMusterCommandHandler = CreateDailySiteMusterCommandHandler;
exports.CreateDailySiteMusterCommandHandler = CreateDailySiteMusterCommandHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_snapshot_service_1.AttendanceSnapshotService,
        attendance_initialization_service_1.AttendanceInitializationService,
        event_bus_service_1.EventBusService])
], CreateDailySiteMusterCommandHandler);
//# sourceMappingURL=create-daily-site-muster.command.js.map