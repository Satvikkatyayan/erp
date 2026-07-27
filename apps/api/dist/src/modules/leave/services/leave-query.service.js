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
var LeaveQueryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveQueryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let LeaveQueryService = LeaveQueryService_1 = class LeaveQueryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(LeaveQueryService_1.name);
    }
    async getLeaveBalances(ctx) {
        return this.prisma.leaveBalance.findMany({
            where: { employeeId: ctx.userId },
            include: {
                leaveType: true
            }
        });
    }
    async getPendingRequests(ctx) {
        return this.prisma.leaveRequest.findMany({
            where: { employeeId: ctx.userId, status: 'PENDING' }
        });
    }
};
exports.LeaveQueryService = LeaveQueryService;
exports.LeaveQueryService = LeaveQueryService = LeaveQueryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaveQueryService);
//# sourceMappingURL=leave-query.service.js.map