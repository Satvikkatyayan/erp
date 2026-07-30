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
exports.LeaveTimelineRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const uuid_1 = require("uuid");
let LeaveTimelineRepository = class LeaveTimelineRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTimelineEntry(tenantId, leaveRequestId, action, performedBy, data, tx) {
        const client = tx || this.prisma;
        return client.leaveLedger.create({
            data: {
                id: (0, uuid_1.v4)(),
                leaveRequestId,
                transactionType: action,
                performedBy,
                metadata: data,
                createdAt: new Date()
            }
        });
    }
    async getTimeline(tenantId, leaveRequestId) {
        return this.prisma.leaveLedger.findMany({
            where: { leaveRequestId },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.LeaveTimelineRepository = LeaveTimelineRepository;
exports.LeaveTimelineRepository = LeaveTimelineRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaveTimelineRepository);
//# sourceMappingURL=timeline.repository.js.map