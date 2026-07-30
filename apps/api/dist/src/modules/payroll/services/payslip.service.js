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
var PayslipService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipService = void 0;
const common_1 = require("@nestjs/common");
const payslip_repository_1 = require("../repositories/payslip.repository");
const payslip_assembler_service_1 = require("./payslip-assembler.service");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const payroll_events_1 = require("../domain/events/payroll.events");
let PayslipService = PayslipService_1 = class PayslipService {
    constructor(payslipRepo, assembler, eventBus) {
        this.payslipRepo = payslipRepo;
        this.assembler = assembler;
        this.eventBus = eventBus;
        this.logger = new common_1.Logger(PayslipService_1.name);
    }
    async generatePayslip(ctx, runId, employeeId, calculationId, snapshotId, tx) {
        this.logger.log(`Generating payslip for employee ${employeeId}`);
        const snapshot = await tx.payPayrollSnapshot.findUnique({ where: { id: snapshotId } });
        if (!snapshot)
            throw new common_1.BadRequestException('Snapshot not found');
        const calculation = await tx.payPayrollCalculation.findUnique({ where: { id: calculationId } });
        if (!calculation)
            throw new common_1.BadRequestException('Calculation not found');
        const calculationSteps = await tx.payCalculationStep.findMany({
            where: { calculationId },
            orderBy: { executionOrder: 'asc' }
        });
        const snapData = typeof snapshot.snapshotData === 'string'
            ? JSON.parse(snapshot.snapshotData)
            : (snapshot.snapshotData || {});
        const assemblyCtx = {
            snapshot,
            calculation,
            calculationSteps,
            employeeData: snapData.salaryAssignment?.employee || {},
            companyData: snapData.company || {},
            salaryStructureVersion: 1
        };
        const latestVersion = await this.payslipRepo.getLatest(calculationId, ctx.tenantId);
        const previousVersionNumber = latestVersion ? latestVersion.versionNumber : 0;
        const payslipData = this.assembler.assemble(assemblyCtx, previousVersionNumber);
        const payslip = await this.payslipRepo.createVersion(calculationId, ctx.tenantId, payslipData, null, tx);
        if (previousVersionNumber === 0) {
            this.eventBus.publish(new payroll_events_1.PayslipGeneratedEvent(payslip.id, runId, employeeId));
        }
        else {
            this.eventBus.publish(new payroll_events_1.PayslipRegeneratedEvent(payslip.id, runId, employeeId, payslip.versionNumber));
        }
        this.eventBus.publish(new payroll_events_1.PayslipVersionCreatedEvent(payslip.id, runId, employeeId, payslip.versionNumber));
        return payslip.id;
    }
};
exports.PayslipService = PayslipService;
exports.PayslipService = PayslipService = PayslipService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payslip_repository_1.PayPayslipRepository,
        payslip_assembler_service_1.PayslipAssembler,
        event_bus_service_1.EventBusService])
], PayslipService);
//# sourceMappingURL=payslip.service.js.map