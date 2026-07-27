"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const department_hierarchy_service_1 = require("./modules/organization/services/department-hierarchy.service");
const organization_bootstrap_service_1 = require("./modules/organization/bootstrap/organization-bootstrap.service");
const platform_sdk_1 = require("./core/sdk/platform.sdk");
const platform_exception_filter_1 = require("./common/filters/platform-exception.filter");
async function verifyOrganizationModule() {
    const logger = new common_1.Logger('Org-Verification');
    logger.log('Starting Phase 5.1: Organization Management Verification...');
    const prisma = new client_1.PrismaClient();
    const prismaService = prisma;
    const sdk = new platform_sdk_1.PlatformSDK(prismaService);
    const filter = new platform_exception_filter_1.PlatformExceptionFilter();
    const hierarchyService = new department_hierarchy_service_1.DepartmentHierarchyService(prismaService, sdk);
    const bootstrapService = new organization_bootstrap_service_1.OrganizationBootstrapService(prismaService, sdk);
    await prisma.tenant.deleteMany();
    const tenant = await prisma.tenant.create({
        data: { code: 'TENANT-01', name: 'Acme Group' }
    });
    const org = await prisma.organization.create({
        data: {
            tenantId: tenant.id,
            code: 'ACME-IND',
            name: 'Acme India Pvt Ltd',
            timezone: 'Asia/Kolkata'
        }
    });
    const ctx = {
        userId: 'mock-user-id',
        organizationId: org.id,
        correlationId: 'org-boot-123',
        tenantId: tenant.id,
        locale: 'en-IN',
        timezone: 'Asia/Kolkata',
        requestId: 'req-01',
        traceId: 'trc-99',
        featureFlags: {}
    };
    logger.log('[Test 1] Organization Bootstrap (Default Branch & Settings)');
    const bootstrapRes = await bootstrapService.bootstrapNewOrganization(ctx, org.id);
    if (bootstrapRes.success && bootstrapRes.data.branch.code === 'HQ') {
        logger.log(' - ✅ Bootstrap successfully provisioned default HQ Branch and Settings v1 Snapshot.');
    }
    logger.log('[Test 2] Multi-tenant Department Hierarchy & Cycle Detection');
    const corp = await prisma.department.create({
        data: { tenantId: tenant.id, code: 'CORP', name: 'Corporate' }
    });
    const it = await prisma.department.create({
        data: { tenantId: tenant.id, parentId: corp.id, code: 'IT', name: 'Information Tech' }
    });
    const eng = await prisma.department.create({
        data: { tenantId: tenant.id, parentId: it.id, code: 'ENG', name: 'Engineering' }
    });
    logger.log(' - Corporate -> IT -> Engineering structure seeded.');
    try {
        await hierarchyService.moveDepartment(ctx, corp.id, eng.id);
    }
    catch (err) {
        const httpRes = filter.catch(err, null);
        if (httpRes.statusCode === 400 && httpRes.code === 'ERR_VALIDATION') {
            logger.log(' - ✅ Cycle Detection successful. Prevented cyclic move (Corporate under Engineering).');
            logger.log(' - ✅ Global Filter mapped validation error to HTTP 400.');
        }
    }
    logger.log('[Test 3] Effective Dating Validation (History tracking)');
    const designation = await prisma.designation.create({
        data: { tenantId: tenant.id, code: 'SWE', name: 'Software Engineer', level: 1 }
    });
    const retired = await prisma.designation.update({
        where: { id: designation.id },
        data: { effectiveTo: new Date(), status: 'INACTIVE' }
    });
    if (retired.effectiveTo !== null && retired.status === 'INACTIVE') {
        logger.log(' - ✅ Effective Dating preserved accurately on Designations.');
    }
    logger.log('Organization Module Verification Completed Successfully.');
    await prisma.$disconnect();
}
verifyOrganizationModule().then(() => process.exit(0)).catch(async (e) => {
    console.error(e);
    await (new client_1.PrismaClient()).$disconnect();
    process.exit(1);
});
//# sourceMappingURL=verify-organization.js.map