import { Injectable } from '@nestjs/common';
import { ISecurityEventLogger } from './security-event-logger.interface';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PostgresSecurityEventLogger implements ISecurityEventLogger {
  constructor(private prisma: PrismaService) {}

  async logEvent(userId: string | null, eventType: string, details?: any, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.prisma.securityEvent.create({
      data: {
        userId,
        eventType,
        details,
        ipAddress,
        userAgent,
      },
    });
  }
}