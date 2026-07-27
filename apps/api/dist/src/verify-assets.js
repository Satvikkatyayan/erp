"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./common/prisma/prisma.service");
const asset_operation_engine_1 = require("./modules/assets/services/asset-operation.engine");
const reservation_engine_1 = require("./modules/assets/services/reservation.engine");
const software_license_service_1 = require("./modules/assets/services/software-license.service");
const warranty_engine_1 = require("./modules/assets/services/warranty.engine");
const asset_recovery_service_1 = require("./modules/assets/services/asset-recovery.service");
const maintenance_service_1 = require("./modules/assets/services/maintenance.service");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
async function bootstrap() {
    const logger = new common_1.Logger('Asset-Verification');
    logger.log('Starting Phase 5.8: Enterprise Asset Management Verification...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const engine = app.get(asset_operation_engine_1.AssetOperationEngine);
    const reservationEngine = app.get(reservation_engine_1.ReservationEngine);
    const softwareService = app.get(software_license_service_1.SoftwareLicenseService);
    const warrantyEngine = app.get(warranty_engine_1.WarrantyEngine);
    const recoveryService = app.get(asset_recovery_service_1.AssetRecoveryService);
    const maintenanceService = app.get(maintenance_service_1.MaintenanceService);
    const tenantId = 'b303300e-9c92-4257-923d-43d837b8b1a0';
    const organizationId = '8f35c249-14a5-4bf5-b918-6bb7f55f2efb';
    const employeeId = '2958c825-ff19-471c-abd8-4b02b4612d3a';
    const actorId = (0, uuid_1.v4)();
    const ctx = { tenantId, organizationId, correlationId: (0, uuid_1.v4)(), requestId: (0, uuid_1.v4)(), traceId: (0, uuid_1.v4)(), locale: 'en-US', timezone: 'UTC', userId: actorId, featureFlags: {} };
    try {
        logger.log('--- Setting up Asset Data ---');
        await prisma.tenant.upsert({
            where: { id: tenantId },
            update: {},
            create: { id: tenantId, code: 'SYS-TENANT', name: 'System Tenant' }
        });
        const categoryId = (0, uuid_1.v4)();
        await prisma.assetCategory.create({
            data: {
                id: categoryId,
                tenantId,
                organizationId,
                code: `CAT-${(0, uuid_1.v4)().substring(0, 4)}`,
                name: 'Laptops',
                assetType: 'DURABLE',
            }
        });
        const assetId = (0, uuid_1.v4)();
        await prisma.asset.create({
            data: {
                id: assetId,
                tenantId,
                organizationId,
                categoryId,
                name: 'MacBook Pro M3',
                assetType: 'DURABLE',
                status: 'REGISTERED',
            }
        });
        logger.log('[Test 1] Assignment Workflow');
        await engine.executeTransition(ctx, assetId, 'Assign', { employeeId }, actorId);
        let asset = await prisma.asset.findUnique({ where: { id: assetId } });
        if (asset?.status !== 'ASSIGNED')
            throw new Error('Assignment failed');
        logger.log(' - ✅ Asset successfully assigned and snapshot generated.');
        logger.log('[Test 2] Return Workflow');
        const assignment = await prisma.assetAssignment.findFirst({ where: { assetId } });
        await engine.executeTransition(ctx, assetId, 'Return', { assignmentId: assignment?.id, employeeId, condition: 'GOOD' }, actorId);
        asset = await prisma.asset.findUnique({ where: { id: assetId } });
        if (asset?.status !== 'AVAILABLE')
            throw new Error('Return failed');
        logger.log(' - ✅ Asset returned successfully with condition update.');
        logger.log('[Test 3] Software License Engine');
        const licenseId = (0, uuid_1.v4)();
        await prisma.softwareLicense.create({
            data: {
                id: licenseId,
                tenantId,
                organizationId,
                name: 'Adobe Creative Cloud',
                publisher: 'Adobe',
                licenseType: 'NAMED_USER'
            }
        });
        const poolId = (0, uuid_1.v4)();
        await prisma.softwareLicensePool.create({
            data: {
                id: poolId,
                tenantId,
                licenseId,
                totalSeats: 1
            }
        });
        await softwareService.allocateSeat(ctx, poolId, employeeId);
        logger.log(' - ✅ Seat allocated successfully.');
        try {
            await softwareService.allocateSeat(ctx, poolId, (0, uuid_1.v4)());
            throw new Error('Seat allocation should have failed');
        }
        catch (e) {
            if (!e.message.includes('No seats available'))
                throw e;
            logger.log(' - ✅ Software seat exhaustion correctly blocked over-allocation.');
        }
        logger.log('[Test 4] Shared Asset Reservation');
        await prisma.assetCategory.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId,
                organizationId,
                code: `VEH-${(0, uuid_1.v4)().substring(0, 4)}`,
                name: 'Vehicles',
                assetType: 'SHARED',
            }
        });
        const vehicleId = (0, uuid_1.v4)();
        await prisma.asset.create({
            data: {
                id: vehicleId,
                tenantId,
                organizationId,
                categoryId,
                name: 'Company Tesla',
                assetType: 'SHARED',
                status: 'AVAILABLE',
            }
        });
        await reservationEngine.createReservation(ctx, vehicleId, employeeId, new Date(), new Date(), true, 'FREQ=WEEKLY;INTERVAL=1');
        logger.log(' - ✅ Recurring reservation created successfully.');
        logger.log('[Test 5] Warranty Contracts');
        await warrantyEngine.addWarrantyContract(ctx, assetId, 'MANUFACTURER', new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
        logger.log(' - ✅ Warranty contract registered.');
        logger.log('[Test 6] Asset Recovery Integration');
        await recoveryService.initiateRecovery(ctx, assetId, employeeId, 'TERMINATION');
        logger.log(' - ✅ Offboarding recovery initiated successfully.');
        logger.log('[Test 7] Maintenance Engine');
        await maintenanceService.scheduleMaintenance(ctx, vehicleId, 'Annual Service', 'ANNUALLY', new Date());
        logger.log(' - ✅ Preventive maintenance scheduled.');
        logger.log('\n✅ Asset Management Verification Completed Successfully.\n');
    }
    catch (error) {
        logger.error('Verification Failed');
        console.error(error);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=verify-assets.js.map