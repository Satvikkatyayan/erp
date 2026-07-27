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
var EmployeeHierarchyQueryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeHierarchyQueryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let EmployeeHierarchyQueryService = EmployeeHierarchyQueryService_1 = class EmployeeHierarchyQueryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(EmployeeHierarchyQueryService_1.name);
    }
    async getDirectReports(ctx, managerId) {
        const assignments = await this.prisma.empReportingAssignment.findMany({
            where: {
                managerId,
                effectiveTo: null,
            },
            include: {
                employee: true
            }
        });
        return assignments.map(a => a.employee);
    }
    async getIndirectReports(ctx, managerId, maxDepth = 5) {
        const allReports = [];
        let currentLevelIds = [managerId];
        for (let depth = 1; depth <= maxDepth; depth++) {
            if (currentLevelIds.length === 0)
                break;
            const assignments = await this.prisma.empReportingAssignment.findMany({
                where: {
                    managerId: { in: currentLevelIds },
                    effectiveTo: null,
                },
                include: { employee: true }
            });
            if (assignments.length === 0)
                break;
            const employeesAtLevel = assignments.map(a => a.employee);
            const newIds = employeesAtLevel.map(e => e.id).filter(id => !allReports.some(r => r.id === id));
            const uniqueEmployees = employeesAtLevel.filter(e => newIds.includes(e.id));
            allReports.push(...uniqueEmployees);
            currentLevelIds = newIds;
        }
        return allReports;
    }
    async getTeamScopeIds(ctx, managerId, includeIndirect = true, maxDepth = 5) {
        const directs = await this.getDirectReports(ctx, managerId);
        let ids = directs.map(e => e.id);
        if (includeIndirect) {
            const indirects = await this.getIndirectReports(ctx, managerId, maxDepth);
            indirects.forEach(e => {
                if (!ids.includes(e.id))
                    ids.push(e.id);
            });
        }
        return ids;
    }
};
exports.EmployeeHierarchyQueryService = EmployeeHierarchyQueryService;
exports.EmployeeHierarchyQueryService = EmployeeHierarchyQueryService = EmployeeHierarchyQueryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeHierarchyQueryService);
//# sourceMappingURL=employee-hierarchy-query.service.js.map