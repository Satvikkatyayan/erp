import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class BackgroundVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async initiate(ctx: PlatformContext, applicationId: string) {
    return this.prisma.recBackgroundVerification.create({
      data: {
        tenantId: ctx.tenantId,
        applicationId,
        vendorName: 'DefaultVendor'
      }
    });
  }
}
