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
exports.CommunicationHistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let CommunicationHistoryRepository = class CommunicationHistoryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createHistory(tenantId, data, tx) {
        const db = tx || this.prisma;
        return db.communicationHistory.create({
            data: {
                tenantId,
                channel: data.channel,
                recipient: data.recipient,
                subject: data.subject,
                body: data.body,
                status: data.status,
                provider: data.provider,
            },
        });
    }
    async getHistoryByTenant(tenantId, filters = {}, tx) {
        const db = tx || this.prisma;
        return db.communicationHistory.findMany({
            where: {
                tenantId,
                ...filters,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.CommunicationHistoryRepository = CommunicationHistoryRepository;
exports.CommunicationHistoryRepository = CommunicationHistoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommunicationHistoryRepository);
//# sourceMappingURL=communication-history.repository.js.map