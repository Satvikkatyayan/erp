const fs = require('fs');
const path = require('path');

const ORG_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\modules\\organization';

const dirs = [
    path.join(ORG_DIR, 'controllers'),
    path.join(ORG_DIR, 'services'),
    path.join(ORG_DIR, 'commands'),
    path.join(ORG_DIR, 'queries'),
    path.join(ORG_DIR, 'events'),
    path.join(ORG_DIR, 'bootstrap')
];

dirs.forEach(d => {
    if (!fs.existsSync(d)) {
         fs.mkdirSync(d, { recursive: true });
    }
});

const files = {
    // ---------------------------------------------
    // DEPARTMENT HIERARCHY SERVICE
    // ---------------------------------------------
    [path.join(ORG_DIR, 'services', 'department-hierarchy.service.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ValidationError } from '../../../core/contracts/errors/platform.error';

@Injectable()
export class DepartmentHierarchyService {
   private readonly logger = new Logger(DepartmentHierarchyService.name);

   constructor(
      private readonly prisma: PrismaService,
      private readonly platform: PlatformSDK
   ) {}

   async detectCycle(tenantId: string, departmentId: string, newParentId: string): Promise<boolean> {
      // Traverse up from newParentId to ensure departmentId is not an ancestor
      let currentId: string | null = newParentId;
      while (currentId) {
         if (currentId === departmentId) return true;
         const current = await this.prisma.department.findUnique({
            where: { id: currentId },
            select: { parentId: true }
         });
         currentId = current?.parentId || null;
      }
      return false;
   }

   async moveDepartment(ctx: PlatformContext, departmentId: string, newParentId: string) {
       return this.platform.pipeline.execute(ctx, 'OrganizationModule', 'moveDepartment', async () => {
           const isCycle = await this.detectCycle(ctx.tenantId!, departmentId, newParentId);
           if (isCycle) {
               throw new ValidationError('Cyclic reference detected in department hierarchy', ctx.correlationId, { departmentId, newParentId });
           }

           const dept = await this.prisma.department.update({
               where: { id: departmentId },
               data: { parentId: newParentId, updatedAt: new Date() }
           });

           // Fire domain event (conceptually, we use PlatformSDK to dispatch)
           // this.platform.events.publish('DepartmentMoved', dept);

           return dept;
       });
   }
}
`,
    // ---------------------------------------------
    // ORGANIZATION BOOTSTRAP SERVICE
    // ---------------------------------------------
    [path.join(ORG_DIR, 'bootstrap', 'organization-bootstrap.service.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class OrganizationBootstrapService {
   private readonly logger = new Logger(OrganizationBootstrapService.name);

   constructor(
       private readonly prisma: PrismaService,
       private readonly platform: PlatformSDK
   ) {}

   async bootstrapNewOrganization(ctx: PlatformContext, orgId: string) {
       return this.platform.pipeline.execute(ctx, 'OrganizationModule', 'bootstrapOrganization', async () => {
           const org = await this.prisma.organization.findUnique({ where: { id: orgId } });
           if (!org) throw new Error('Organization not found');

           // 1. Setup Default Settings Snapshot
           const settings = await this.prisma.orgSettingsSnapshot.create({
               data: {
                   tenantId: ctx.tenantId!,
                   organizationId: orgId,
                   version: 1,
                   payload: {
                       dateFormat: 'YYYY-MM-DD',
                       timezone: org.timezone || 'UTC',
                       currency: org.currency || 'USD',
                       weekendRules: [0, 6] // Sun, Sat
                   }
               }
           });

           // 2. Default Branch (HQ)
           const branch = await this.prisma.branch.create({
               data: {
                   tenantId: ctx.tenantId!,
                   organizationId: orgId,
                   code: 'HQ',
                   name: 'Headquarters',
                   timezone: org.timezone || 'UTC'
               }
           });

           // 3. Emit Domain Event
           // platform.events.publish(...)
           this.logger.log(\`[\${ctx.correlationId}] Organization \${org.code} bootstrapped successfully.\`);
           return { settings, branch };
       });
   }
}
`,
    // ---------------------------------------------
    // MODULE DECLARATION
    // ---------------------------------------------
    [path.join(ORG_DIR, 'organization.module.ts')]: `
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { DepartmentHierarchyService } from './services/department-hierarchy.service';
import { OrganizationBootstrapService } from './bootstrap/organization-bootstrap.service';

@Module({
   imports: [PrismaModule],
   providers: [
      DepartmentHierarchyService,
      OrganizationBootstrapService
   ],
   exports: [DepartmentHierarchyService, OrganizationBootstrapService]
})
export class OrganizationModule {}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Phase 5.1 Domain Layer scaffolded.');
