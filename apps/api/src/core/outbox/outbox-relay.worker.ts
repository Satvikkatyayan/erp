import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../common/prisma/prisma.service';
import { EventBusService } from '../events/event-bus.service';
import { v4 as uuidv4 } from 'uuid';
import { DomainEvent } from '../events/interfaces/domain-event.interface';

@Injectable()
export class OutboxRelayWorker {
  private readonly logger = new Logger(OutboxRelayWorker.name);
  private isProcessing = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleRelay() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      const messages = await this.prisma.outboxMessage.findMany({
        where: {
          state: 'PENDING',
        },
        take: 100,
      });

      if (messages.length === 0) {
        this.isProcessing = false;
        return;
      }

      this.logger.log(`Relaying ${messages.length} messages from outbox...`);

      for (const msg of messages) {
        // Optimistic locking via DB transaction
        await this.prisma.$transaction(async (tx) => {
           const locked = await tx.outboxMessage.updateMany({
             where: { id: msg.id, state: 'PENDING' },
             data: { state: 'PROCESSING', lockedBy: 'relay-worker', lockedAt: new Date() }
           });
           
           if (locked.count > 0) {
             try {
                const event: DomainEvent = {
                   eventId: msg.id,
                   eventName: msg.eventName,
                   payload: msg.payload,
                   timestamp: new Date(),
                   correlationId: msg.correlationId || uuidv4(),
                   causationId: msg.causationId,
                   version: 1,
                };
                
                await this.eventBus.publish(event);
                
                await tx.outboxMessage.update({
                  where: { id: msg.id },
                  data: { state: 'PROCESSED' }
                });
             } catch (error: any) {
                // Determine retry logic
                const newRetryCount = msg.retryCount + 1;
                const maxRetries = 5;
                const nextRetry = new Date(Date.now() + Math.pow(2, newRetryCount) * 1000);
                
                await tx.outboxMessage.update({
                  where: { id: msg.id },
                  data: {
                    state: newRetryCount >= maxRetries ? 'DEAD_LETTER' : 'PENDING',
                    retryCount: newRetryCount,
                    nextRetryAt: nextRetry,
                    error: error.message,
                  }
                });
             }
           }
        });
      }
    } catch (e: any) {
      this.logger.error('Failed to relay outbox messages', e.stack);
    } finally {
      this.isProcessing = false;
    }
  }
}