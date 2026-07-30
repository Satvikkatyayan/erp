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
exports.LeaveBalanceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let LeaveBalanceRepository = class LeaveBalanceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findEmployeeLeaveBalance(tenantId, employeeId, tx) {
        const client = tx || this.prisma;
        return client.leaveBalance.findMany({
            where: { tenantId, employeeId }
        });
    }
    async updateLeaveBalance(tenantId, id, data, tx) {
        const client = tx || this.prisma;
        return client.leaveBalance.updateMany({
            where: { tenantId, id },
            data
        });
    }
    async listLeaveBalances(tenantId, filters, sort, tx) {
        const client = tx || this.prisma;
        const orderBy = sort || { createdAt: 'desc' };
        return client.leaveBalance.findMany({
            where: { tenantId, ...filters },
            orderBy
        });
    }
};
exports.LeaveBalanceRepository = LeaveBalanceRepository;
exports.LeaveBalanceRepository = LeaveBalanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaveBalanceRepository);
//# sourceMappingURL=leave-balance.repository.js.map