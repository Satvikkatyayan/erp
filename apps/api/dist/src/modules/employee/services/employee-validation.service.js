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
exports.EmployeeValidationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_error_1 = require("../../../core/contracts/errors/platform.error");
let EmployeeValidationService = class EmployeeValidationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateNewHire(ctx, payload) {
        const duplicate = await this.prisma.empPersonalDetails.findFirst({
            where: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                employee: { tenantId: ctx.tenantId }
            }
        });
        if (duplicate) {
            throw new platform_error_1.ValidationError('Employee with this name might already exist.', ctx.correlationId);
        }
        const position = await this.prisma.empPosition.findFirst({
            where: { id: payload.positionId, tenantId: ctx.tenantId, departmentId: payload.departmentId }
        });
        if (!position) {
            throw new platform_error_1.ValidationError('Position does not match department or tenant.', ctx.correlationId);
        }
        if (payload.age && payload.age < 18) {
            throw new platform_error_1.ValidationError('Employee must be at least 18 years old.', ctx.correlationId);
        }
        if (payload.managerId) {
            const manager = await this.prisma.empEmployee.findFirst({ where: { id: payload.managerId, tenantId: ctx.tenantId } });
            if (!manager || manager.status !== 'JOINED') {
                throw new platform_error_1.ValidationError('Reporting manager must be an active employee.', ctx.correlationId);
            }
        }
        if (payload.requireDocuments && (!payload.documents || payload.documents.length === 0)) {
            throw new platform_error_1.ValidationError('Mandatory documents are missing.', ctx.correlationId);
        }
    }
};
exports.EmployeeValidationService = EmployeeValidationService;
exports.EmployeeValidationService = EmployeeValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeValidationService);
//# sourceMappingURL=employee-validation.service.js.map