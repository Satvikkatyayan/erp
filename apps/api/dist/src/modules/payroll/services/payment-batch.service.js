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
var PaymentBatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentBatchService = void 0;
const common_1 = require("@nestjs/common");
const payment_batch_repository_1 = require("../repositories/payment-batch.repository");
const uuid_1 = require("uuid");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const payroll_events_1 = require("../domain/events/payroll.events");
let PaymentBatchService = PaymentBatchService_1 = class PaymentBatchService {
    constructor(batchRepo, eventBus) {
        this.batchRepo = batchRepo;
        this.eventBus = eventBus;
        this.logger = new common_1.Logger(PaymentBatchService_1.name);
    }
    async generatePaymentBatch(ctx, payrollRunId, calculations, tx) {
        this.logger.log(`Generating payment batch for run ${payrollRunId}`);
        const batch = await this.batchRepo.createBatch(ctx.tenantId, payrollRunId, 1, tx);
        const instructions = calculations.map(calc => ({
            id: (0, uuid_1.v4)(),
            batchId: batch.id,
            employeeId: calc.employeeId,
            netPay: calc.netPay,
            currency: calc.currencyId || 'INR',
            bankAccountReference: `ACCT-${calc.employeeId}`,
            paymentMethod: 'BANK_TRANSFER',
            paymentStatus: 'Pending',
            referenceNumber: null
        }));
        await this.batchRepo.createInstructions(instructions, tx);
        this.eventBus.publish(new payroll_events_1.PaymentBatchCreatedEvent(batch.id, payrollRunId, ctx.tenantId));
        return batch.id;
    }
};
exports.PaymentBatchService = PaymentBatchService;
exports.PaymentBatchService = PaymentBatchService = PaymentBatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_batch_repository_1.PayPaymentBatchRepository,
        event_bus_service_1.EventBusService])
], PaymentBatchService);
//# sourceMappingURL=payment-batch.service.js.map