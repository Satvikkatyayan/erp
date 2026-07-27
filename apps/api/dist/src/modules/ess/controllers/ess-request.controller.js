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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssRequestController = void 0;
const common_1 = require("@nestjs/common");
const employee_request_service_1 = require("../services/employee-request.service");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let EssRequestController = class EssRequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    async submitLeave(req, payload) {
        const ctx = req.context;
        return this.requestService.submitLeaveRequest(ctx, payload);
    }
    async submitExpense(req, payload) {
        const ctx = req.context;
        return this.requestService.submitExpenseClaim(ctx, payload);
    }
};
exports.EssRequestController = EssRequestController;
__decorate([
    (0, common_1.Post)('leave'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EssRequestController.prototype, "submitLeave", null);
__decorate([
    (0, common_1.Post)('expense'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EssRequestController.prototype, "submitExpense", null);
exports.EssRequestController = EssRequestController = __decorate([
    (0, common_1.Controller)('ess/requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [employee_request_service_1.EmployeeRequestService])
], EssRequestController);
//# sourceMappingURL=ess-request.controller.js.map