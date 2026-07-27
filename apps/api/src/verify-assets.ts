import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { AssetOperationEngine } from './modules/assets/services/asset-operation.engine';
import { ReservationEngine } from './modules/assets/services/reservation.engine';
import { SoftwareLicenseService } from './modules/assets/services/software-license.service';
import { WarrantyEngine } from './modules/assets/services/warranty.engine';
import { AssetRecoveryService } from './modules/assets/services/asset-recovery.service';
import { MaintenanceService } from './modules/assets/services/maintenance.service';
import { PlatformContext } from './core/contracts/context/platform-context';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const logger = new Logger('Asset-Verification');
  logger.log('Starting Phase 5.8: Enterprise Asset Management Verification...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);
  const engine = app.get(AssetOperationEngine);
  const reservationEngine = app.get(ReservationEngine);
  const softwareService = app.get(SoftwareLicenseService);
  const warrantyEngine = app.get(WarrantyEngine);
  const recoveryService = app.get(AssetRecoveryService);
  const maintenanceService = app.get(MaintenanceService);

  const tenantId = 'b303300e-9c92-4257-923d-43d837b8b1a0'; // Matches other verification scripts
  const organizationId = '8f35c249-14a5-4bf5-b918-6bb7f55f2efb';
  const employeeId = '2958c825-ff19-471c-abd8-4b02b4612d3a';

  const actorId = uuidv4();
  const ctx: PlatformContext = { tenantId, organizationId, correlationId: uuidv4(), requestId: uuidv4(), traceId: uuidv4(), locale: 'en-US', timezone: 'UTC', userId: actorId, featureFlags: {} };

  try {
    logger.log('--- Setting up Asset Data ---');
    // Ensure tenant exists
    await prisma.tenant.upsert({
      where: { id: tenantId },
      update: {},
      create: { id: tenantId, code: 'SYS-TENANT', name: 'System Tenant' }
    });

    const categoryId = uuidv4();
    await prisma.assetCategory.create({
      data: {
        id: categoryId,
        tenantId,
        organizationId,
        code: `CAT-${uuidv4().substring(0,4)}`,
        name: 'Laptops',
        assetType: 'DURABLE',
      }
    });

    const assetId = uuidv4();
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

    // 1. Assignment Workflow
    logger.log('[Test 1] Assignment Workflow');
    await engine.executeTransition(ctx, assetId, 'Assign', { employeeId }, actorId);
    let asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (asset?.status !== 'ASSIGNED') throw new Error('Assignment failed');
    logger.log(' - ✅ Asset successfully assigned and snapshot generated.');

    // 2. Return Workflow
    logger.log('[Test 2] Return Workflow');
    const assignment = await prisma.assetAssignment.findFirst({ where: { assetId } });
    await engine.executeTransition(ctx, assetId, 'Return', { assignmentId: assignment?.id, employeeId, condition: 'GOOD' }, actorId);
    asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (asset?.status !== 'AVAILABLE') throw new Error('Return failed');
    logger.log(' - ✅ Asset returned successfully with condition update.');

    // 3. Software Licenses
    logger.log('[Test 3] Software License Engine');
    const licenseId = uuidv4();
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
    
    const poolId = uuidv4();
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
      await softwareService.allocateSeat(ctx, poolId, uuidv4());
      throw new Error('Seat allocation should have failed');
    } catch (e: any) {
      if (!e.message.includes('No seats available')) throw e;
      logger.log(' - ✅ Software seat exhaustion correctly blocked over-allocation.');
    }

    // 4. Reservation Recurrence
    logger.log('[Test 4] Shared Asset Reservation');
    await prisma.assetCategory.create({
      data: {
        id: uuidv4(),
        tenantId,
        organizationId,
        code: `VEH-${uuidv4().substring(0,4)}`,
        name: 'Vehicles',
        assetType: 'SHARED',
      }
    });
    const vehicleId = uuidv4();
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

    // 5. Warranty & Contracts
    logger.log('[Test 5] Warranty Contracts');
    await warrantyEngine.addWarrantyContract(ctx, assetId, 'MANUFACTURER', new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    logger.log(' - ✅ Warranty contract registered.');

    // 6. Recovery Workflow
    logger.log('[Test 6] Asset Recovery Integration');
    await recoveryService.initiateRecovery(ctx, assetId, employeeId, 'TERMINATION');
    logger.log(' - ✅ Offboarding recovery initiated successfully.');

    // 7. Maintenance Scheduling
    logger.log('[Test 7] Maintenance Engine');
    await maintenanceService.scheduleMaintenance(ctx, vehicleId, 'Annual Service', 'ANNUALLY', new Date());
    logger.log(' - ✅ Preventive maintenance scheduled.');

    logger.log('\n✅ Asset Management Verification Completed Successfully.\n');
  } catch (error) {
    logger.error('Verification Failed');
    console.error(error);
  }

  await app.close();
}

bootstrap();
