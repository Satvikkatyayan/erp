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
exports.EmpEmployeeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const uuid_1 = require("uuid");
let EmpEmployeeRepository = class EmpEmployeeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEmployee(tenantId, organizationId, employeeNumber, status, tx) {
        const client = tx || this.prisma;
        return client.empEmployee.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId,
                organizationId,
                employeeNumber,
                status,
            }
        });
    }
    async getEmployeeById(tenantId, id, tx) {
        const client = tx || this.prisma;
        return client.empEmployee.findFirst({
            where: { tenantId, id },
            include: {
                personalDetails: true,
            }
        });
    }
    async findEmployeeById(tenantId, id, tx) {
        const client = tx || this.prisma;
        const employee = await client.empEmployee.findFirst({
            where: { tenantId, id },
            include: {
                personalDetails: true,
            }
        });
        return employee;
    }
    async findEmployeesByDepartment(tenantId, departmentId, filters, sort, tx) {
        const client = tx || this.prisma;
        const where = { tenantId, departmentId, ...filters };
        const orderBy = sort || { createdAt: 'desc' };
        const employees = await client.empEmployee.findMany({
            where,
            orderBy,
            include: { personalDetails: true }
        });
        return employees;
    }
    async findEmployeesByManager(tenantId, managerId, filters, sort, tx) {
        const client = tx || this.prisma;
        const where = { tenantId, managerId, ...filters };
        const orderBy = sort || { createdAt: 'desc' };
        const employees = await client.empEmployee.findMany({
            where,
            orderBy,
            include: { personalDetails: true }
        });
        return employees;
    }
    async updateEmployeeStatus(tenantId, id, status, tx) {
        const client = tx || this.prisma;
        return client.empEmployee.updateMany({
            where: { tenantId, id },
            data: { status }
        });
    }
    async exists(tenantId, id, tx) {
        const client = tx || this.prisma;
        const count = await client.empEmployee.count({ where: { tenantId, id } });
        return count > 0;
    }
    async findEmployeesByProject(tenantId, projectId, filters, sort, tx) {
        const client = tx || this.prisma;
        const orderBy = sort || { createdAt: 'desc' };
        return client.empEmployee.findMany({
            where: { tenantId, jobAssignments: { some: { projectId, effectiveTo: null } }, ...filters },
            orderBy,
            include: { personalDetails: true }
        });
    }
    async findEmployeesByOrganization(tenantId, organizationId, filters, sort, tx) {
        const client = tx || this.prisma;
        const orderBy = sort || { createdAt: 'desc' };
        return client.empEmployee.findMany({
            where: { tenantId, organizationId, ...filters },
            orderBy,
            include: { personalDetails: true }
        });
    }
    async findEmployeesByBranch(tenantId, branchId, filters, sort, tx) {
        const client = tx || this.prisma;
        const orderBy = sort || { createdAt: 'desc' };
        return client.empEmployee.findMany({
            where: { tenantId, jobAssignments: { some: { branchId, effectiveTo: null } }, ...filters },
            orderBy,
            include: { personalDetails: true }
        });
    }
    async searchEmployees(tenantId, filters, sort, tx) {
        const client = tx || this.prisma;
        const orderBy = sort || { createdAt: 'desc' };
        return client.empEmployee.findMany({
            where: { tenantId, ...filters },
            orderBy,
            include: { personalDetails: true }
        });
    }
};
exports.EmpEmployeeRepository = EmpEmployeeRepository;
exports.EmpEmployeeRepository = EmpEmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmpEmployeeRepository);
//# sourceMappingURL=employee.repository.js.map