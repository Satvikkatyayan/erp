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
var ExitLifecycleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const exit_operation_engine_1 = require("../engines/exit-operation.engine");
const exit_timeline_service_1 = require("./exit-timeline.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
let ExitLifecycleService = ExitLifecycleService_1 = class ExitLifecycleService {
    constructor(prisma, engine, timeline, sdk) {
        this.prisma = prisma;
        this.engine = engine;
        this.timeline = timeline;
        this.sdk = sdk;
        this.logger = new common_1.Logger(ExitLifecycleService_1.name);
    }
    async startExit(ctx, employeeId, policyId, reasonId) {
        const request = await this.prisma.exitRequest.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId,
                policyId,
                reasonId,
                status: 'SUBMITTED',
                requestedLwd: new Date()
            }
        });
        await this.timeline.logEvent(request.id, 'ExitRequested', ctx.employeeId, 'Employee submitted exit request');
        await this.sdk.events.publish(ctx, 'ExitRequested', { requestId: request.id, employeeId });
        return request;
    }
    async archiveEmployee(ctx, requestId) {
        const request = await this.prisma.exitRequest.findUnique({
            where: { id: requestId },
            include: { employee: true }
        });
        if (!request)
            throw new Error('Request not found');
        await this.prisma.empEmployee.update({
            where: { id: request.employeeId },
            data: { status: 'ARCHIVED' }
        });
        await this.prisma.exitRequest.update({
            where: { id: requestId },
            data: { status: 'ARCHIVED' }
        });
        await this.timeline.logEvent(request.id, 'EmployeeArchived', ctx.employeeId, 'Employee successfully archived');
        await this.sdk.events.publish(ctx, 'EmployeeArchived', { requestId, employeeId: request.employeeId });
    }
};
exports.ExitLifecycleService = ExitLifecycleService;
exports.ExitLifecycleService = ExitLifecycleService = ExitLifecycleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        exit_operation_engine_1.ExitOperationEngine,
        exit_timeline_service_1.ExitTimelineService,
        platform_sdk_1.PlatformSDK])
], ExitLifecycleService);
//# sourceMappingURL=exit-lifecycle.service.js.map