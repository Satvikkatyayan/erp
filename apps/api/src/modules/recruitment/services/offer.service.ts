import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaService) {}

  async createOfferVersion(applicationId: string, payload: any, version: number) {
    return this.prisma.recOffer.create({
      data: {
        tenantId: payload.tenantId,
        applicationId,
        version,
        baseSalary: payload.baseSalary,
        currency: payload.currency,
        validUntil: payload.validUntil
      }
    });
  }
}
