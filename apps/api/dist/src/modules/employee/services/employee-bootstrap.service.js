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
exports.EmployeeBootstrapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
let EmployeeBootstrapService = class EmployeeBootstrapService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
    }
    async provisionDownstreamProfiles(ctx, employeeId) {
        await this.sdk.reporting.registerDataset(ctx, 'EmployeeHeadcountDataset', {
            organizationId: 'string', branchId: 'string', departmentId: 'string', designationId: 'string',
            employmentType: 'string', activeEmployees: 'number', inactiveEmployees: 'number',
            totalEmployees: 'number', generatedAt: 'date'
        });
        await this.sdk.reporting.registerDataset(ctx, 'OrganizationDistributionDataset', {
            organizationId: 'string', branches: 'array', departments: 'array', teams: 'array', headcount: 'number'
        });
        await this.sdk.reporting.registerDataset(ctx, 'SkillMatrixDataset', {
            employeeId: 'string', skillId: 'string', proficiency: 'string', certificationStatus: 'string'
        });
        await this.sdk.reporting.registerDataset(ctx, 'WorkforceDemographicsDataset', {
            genderDistribution: 'object', ageDistribution: 'object', tenureDistribution: 'object', employmentTypeDistribution: 'object'
        });
        await this.sdk.reporting.registerDataset(ctx, 'EmploymentStatusDataset', {
            active: 'number', probation: 'number', suspended: 'number', noticePeriod: 'number', exited: 'number'
        });
        await this.sdk.search.index(ctx, 'employees', employeeId, {
            employeeNumber: 'TEMP-001',
            name: 'John Doe',
            department: 'ENG',
            manager: 'Jane Smith',
            branch: 'HQ',
            designation: 'SSE',
            skills: ['TypeScript', 'Node.js'],
            status: 'JOINED'
        });
    }
};
exports.EmployeeBootstrapService = EmployeeBootstrapService;
exports.EmployeeBootstrapService = EmployeeBootstrapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], EmployeeBootstrapService);
//# sourceMappingURL=employee-bootstrap.service.js.map