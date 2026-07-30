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
exports.PayrollStateMachineService = exports.PayrollRunStatus = void 0;
const common_1 = require("@nestjs/common");
const payroll_run_repository_1 = require("../repositories/payroll-run.repository");
var PayrollRunStatus;
(function (PayrollRunStatus) {
    PayrollRunStatus["DRAFT"] = "DRAFT";
    PayrollRunStatus["COLLECTING"] = "COLLECTING";
    PayrollRunStatus["CALCULATING"] = "CALCULATING";
    PayrollRunStatus["APPROVED"] = "APPROVED";
    PayrollRunStatus["LOCKED"] = "LOCKED";
    PayrollRunStatus["PROCESSED"] = "PROCESSED";
    PayrollRunStatus["REJECTED"] = "REJECTED";
    PayrollRunStatus["CANCELLED"] = "CANCELLED";
})(PayrollRunStatus || (exports.PayrollRunStatus = PayrollRunStatus = {}));
let PayrollStateMachineService = class PayrollStateMachineService {
    constructor(payrollRunRepo) {
        this.payrollRunRepo = payrollRunRepo;
    }
    validateTransition(current, target) {
        const transitions = {
            [PayrollRunStatus.DRAFT]: [PayrollRunStatus.COLLECTING, PayrollRunStatus.CANCELLED],
            [PayrollRunStatus.COLLECTING]: [PayrollRunStatus.CALCULATING, PayrollRunStatus.DRAFT, PayrollRunStatus.CANCELLED],
            [PayrollRunStatus.CALCULATING]: [PayrollRunStatus.APPROVED, PayrollRunStatus.REJECTED, PayrollRunStatus.CANCELLED],
            [PayrollRunStatus.APPROVED]: [PayrollRunStatus.LOCKED, PayrollRunStatus.REJECTED],
            [PayrollRunStatus.LOCKED]: [PayrollRunStatus.PROCESSED],
            [PayrollRunStatus.REJECTED]: [PayrollRunStatus.DRAFT],
            [PayrollRunStatus.CANCELLED]: [],
            [PayrollRunStatus.PROCESSED]: []
        };
        const allowed = transitions[current] || [];
        if (!allowed.includes(target)) {
            throw new common_1.BadRequestException(`Invalid payroll run state transition from ${current} to ${target}`);
        }
    }
    async transition(runId, targetStatus, tx) {
        const run = await this.payrollRunRepo.findById(runId, tx);
        if (!run)
            throw new common_1.BadRequestException('Payroll run not found');
        this.validateTransition(run.status || PayrollRunStatus.DRAFT, targetStatus);
        await this.payrollRunRepo.save({ id: runId, status: targetStatus }, tx);
    }
};
exports.PayrollStateMachineService = PayrollStateMachineService;
exports.PayrollStateMachineService = PayrollStateMachineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_run_repository_1.PayPayrollRunRepository])
], PayrollStateMachineService);
//# sourceMappingURL=payroll-state-machine.service.js.map