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
exports.SubmitPayrollReviewRejectionHandler = void 0;
const common_1 = require("@nestjs/common");
const payroll_execution_service_1 = require("../../services/payroll-execution.service");
let SubmitPayrollReviewRejectionHandler = class SubmitPayrollReviewRejectionHandler {
    constructor(executionService) {
        this.executionService = executionService;
    }
    async execute(command) {
        await this.executionService.submitReviewRejection(command.ctx, command.runId, command.reviewId, command.remarks);
    }
};
exports.SubmitPayrollReviewRejectionHandler = SubmitPayrollReviewRejectionHandler;
exports.SubmitPayrollReviewRejectionHandler = SubmitPayrollReviewRejectionHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_execution_service_1.PayrollExecutionService])
], SubmitPayrollReviewRejectionHandler);
//# sourceMappingURL=submit-payroll-review-rejection.handler.js.map