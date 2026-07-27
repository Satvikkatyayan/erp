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
var ManagerApprovalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerApprovalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const approval_facade_1 = require("../facades/approval.facade");
let ManagerApprovalService = ManagerApprovalService_1 = class ManagerApprovalService {
    constructor(prisma, approvalFacade) {
        this.prisma = prisma;
        this.approvalFacade = approvalFacade;
        this.logger = new common_1.Logger(ManagerApprovalService_1.name);
    }
    async getPendingApprovals(ctx) {
        return this.prisma.mssApprovalView.findMany({
            where: { managerId: ctx.employeeId, status: 'PENDING' },
            orderBy: { createdAt: 'desc' }
        });
    }
    async processApproval(ctx, approvalId, action, reason) {
        const approval = await this.prisma.mssApprovalView.findUnique({ where: { id: approvalId } });
        if (!approval || approval.managerId !== ctx.employeeId) {
            throw new Error('Approval not found or unauthorized');
        }
        if (action === 'APPROVE') {
            await this.approvalFacade.approve(ctx, approval.workflowId);
        }
        else {
            await this.approvalFacade.reject(ctx, approval.workflowId, reason || '');
        }
        return this.prisma.mssApprovalView.update({
            where: { id: approvalId },
            data: { status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
        });
    }
};
exports.ManagerApprovalService = ManagerApprovalService;
exports.ManagerApprovalService = ManagerApprovalService = ManagerApprovalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        approval_facade_1.ApprovalFacade])
], ManagerApprovalService);
//# sourceMappingURL=manager-approval.service.js.map