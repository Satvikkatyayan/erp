import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OutboxService } from './core/outbox/outbox.service';
import { EventBusService } from './core/events/event-bus.service';
import { DomainEvent } from './core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('EventBusTestRunner');
  logger.log('Bootstrapping Test Runner...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const outboxService = app.get(OutboxService);
  
  const testEvent: DomainEvent = {
    eventId: uuidv4(),
    eventName: 'TestEventFired',
    payload: { message: 'Hello from Outbox' },
    timestamp: new Date(),
    correlationId: uuidv4(),
    causationId: null,
    version: 1,
  };
  
  logger.log('1. Testing Outbox Persistence...');
  await outboxService.saveEvent(testEvent);
  logger.log('Outbox message saved successfully. The OutboxRelayWorker should pick it up shortly.');
  
  // Keep alive for a bit to let the cron run
  logger.log('Waiting 10 seconds for the OutboxRelayWorker to poll...');
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  logger.log('Test completed. (To fully test DLQ and Locking, we need an explicit worker handler for TestEventFired, which defaults to AUDIT queue).');
  
  await app.close();
  process.exit(0);
}

bootstrap();
