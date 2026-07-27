import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) {}

  async createCandidate(ctx: PlatformContext, payload: any) {
    return this.prisma.recCandidate.create({
      data: {
        tenantId: ctx.tenantId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone
      }
    });
  }
}
