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
exports.EmpJobAssignmentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const uuid_1 = require("uuid");
let EmpJobAssignmentRepository = class EmpJobAssignmentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJobAssignment(tenantId, employeeId, data, tx) {
        const client = tx || this.prisma;
        return client.empJobAssignment.create({
            data: {
                id: (0, uuid_1.v4)(),
                employeeId,
                ...data
            }
        });
    }
    async getCurrentJobAssignment(tenantId, employeeId, tx) {
        const client = tx || this.prisma;
        return client.empJobAssignment.findFirst({
            where: { employeeId, effectiveTo: null },
            orderBy: { effectiveFrom: 'desc' }
        });
    }
    async findCurrentJobAssignment(tenantId, employeeId, tx) {
        const client = tx || this.prisma;
        const assignment = await client.empJobAssignment.findFirst({
            where: { employeeId, effectiveTo: null },
            orderBy: { effectiveFrom: 'desc' }
        });
        return assignment;
    }
    async closeCurrentJobAssignment(tenantId, employeeId, effectiveTo, tx) {
        const client = tx || this.prisma;
        const current = await this.getCurrentJobAssignment(tenantId, employeeId, tx);
        if (current) {
            return client.empJobAssignment.update({
                where: { id: current.id },
                data: { effectiveTo }
            });
        }
        return null;
    }
    async findAssignmentHistory(tenantId, employeeId, tx) {
        const client = tx || this.prisma;
        return client.empJobAssignment.findMany({
            where: { employeeId },
            orderBy: { effectiveFrom: 'desc' }
        });
    }
};
exports.EmpJobAssignmentRepository = EmpJobAssignmentRepository;
exports.EmpJobAssignmentRepository = EmpJobAssignmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmpJobAssignmentRepository);
//# sourceMappingURL=job-assignment.repository.js.map