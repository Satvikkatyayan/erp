import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { DomainEvent } from '../events/interfaces/domain-event.interface';
import { RequestContextService } from '../context/request-context.service';

@Injectable()
export class OutboxService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService
  ) {}

  async saveEvent(event: DomainEvent, tx?: any): Promise<void> {
    const prisma = tx || this.prisma;
    
    await prisma.outboxMessage.create({
      data: {
        eventName: event.eventName,
        payload: event.payload as any,
        correlationId: event.correlationId || this.context.correlationId,
        causationId: event.causationId,
        state: 'PENDING'
      }
    });
  }
}