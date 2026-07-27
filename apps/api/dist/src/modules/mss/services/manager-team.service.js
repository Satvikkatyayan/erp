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
var ManagerTeamService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerTeamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ManagerTeamService = ManagerTeamService_1 = class ManagerTeamService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ManagerTeamService_1.name);
    }
    async getDirectory(ctx, scopeIds) {
        const employees = await this.prisma.empEmployee.findMany({
            where: { id: { in: scopeIds } },
            include: {
                personalDetails: true,
                jobAssignments: { where: { effectiveTo: null }, include: { position: true } }
            }
        });
        return employees.map(e => ({
            id: e.id,
            name: `${e.personalDetails?.firstName || ''} ${e.personalDetails?.lastName || ''}`.trim(),
            position: e.jobAssignments?.[0]?.position?.title || 'Unknown',
            status: e.status
        }));
    }
};
exports.ManagerTeamService = ManagerTeamService;
exports.ManagerTeamService = ManagerTeamService = ManagerTeamService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManagerTeamService);
//# sourceMappingURL=manager-team.service.js.map