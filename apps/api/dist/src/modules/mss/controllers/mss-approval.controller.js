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
exports.MssApprovalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const manager_approval_service_1 = require("../services/manager-approval.service");
let MssApprovalController = class MssApprovalController {
    constructor(service) {
        this.service = service;
    }
    async getApprovals(req) {
        return this.service.getPendingApprovals(req.context);
    }
    async processApproval(req, id, action, body) {
        return this.service.processApproval(req.context, id, action.toUpperCase(), body?.reason);
    }
};
exports.MssApprovalController = MssApprovalController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MssApprovalController.prototype, "getApprovals", null);
__decorate([
    (0, common_1.Post)(':id/:action'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('action')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], MssApprovalController.prototype, "processApproval", null);
exports.MssApprovalController = MssApprovalController = __decorate([
    (0, common_1.Controller)('mss/approvals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [manager_approval_service_1.ManagerApprovalService])
], MssApprovalController);
//# sourceMappingURL=mss-approval.controller.js.map