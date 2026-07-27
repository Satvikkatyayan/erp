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
                       currency: org.currencyCode || 'USD',
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
           this.logger.log(`[${ctx.correlationId}] Organization ${org.code} bootstrapped successfully.`);
           return { settings, branch };
       });
   }
}