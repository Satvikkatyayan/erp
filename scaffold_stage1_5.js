const fs = require('fs');
const path = require('path');

const CORE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core';

const directories = [
    path.join(CORE_DIR, 'context'),
    path.join(CORE_DIR, 'logger'),
    path.join(CORE_DIR, 'outbox'),
    path.join(CORE_DIR, 'health'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(CORE_DIR, 'context', 'request-context.service.ts')]: `
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

export interface AppRequestContext {
  userId?: string;
  organizationId?: string;
  branchId?: string;
  employeeId?: string;
  timezone?: string;
  locale?: string;
  correlationId?: string;
  requestId?: string;
}

@Injectable()
export class RequestContextService {
  constructor(private readonly cls: ClsService<AppRequestContext>) {}

  get userId() { return this.cls.get('userId'); }
  get organizationId() { return this.cls.get('organizationId'); }
  get branchId() { return this.cls.get('branchId'); }
  get employeeId() { return this.cls.get('employeeId'); }
  get timezone() { return this.cls.get('timezone'); }
  get locale() { return this.cls.get('locale'); }
  get correlationId() { return this.cls.get('correlationId'); }
  get requestId() { return this.cls.get('requestId'); }

  setContext(key: keyof AppRequestContext, value: string) {
    this.cls.set(key, value);
  }
}
`,
    [path.join(CORE_DIR, 'context', 'correlation-id.middleware.ts')]: `
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ClsService } from 'nestjs-cls';
import { AppRequestContext } from './request-context.service';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService<AppRequestContext>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['x-correlation-id'] as string || uuidv4();
    const requestId = uuidv4();
    
    // Pass to response headers
    res.setHeader('X-Correlation-ID', correlationId);
    res.setHeader('X-Request-ID', requestId);

    this.cls.runWith({ correlationId, requestId }, () => {
        next();
    });
  }
}
`,
    [path.join(CORE_DIR, 'context', 'context.module.ts')]: `
import { Global, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { RequestContextService } from './request-context.service';
import { CorrelationIdMiddleware } from './correlation-id.middleware';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: false }, // Mounted manually to ensure order
    }),
  ],
  providers: [RequestContextService],
  exports: [RequestContextService],
})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
`,
    [path.join(CORE_DIR, 'logger', 'structured-logger.service.ts')]: `
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';

@Injectable({ scope: Scope.TRANSIENT })
export class StructuredLogger extends ConsoleLogger {
  constructor(private readonly contextService: RequestContextService) {
    super();
  }

  log(message: any, context?: string) {
    super.log(this.formatMessage(message), context || this.context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(this.formatMessage(message), trace, context || this.context);
  }

  warn(message: any, context?: string) {
    super.warn(this.formatMessage(message), context || this.context);
  }

  debug(message: any, context?: string) {
    super.debug(this.formatMessage(message), context || this.context);
  }

  verbose(message: any, context?: string) {
    super.verbose(this.formatMessage(message), context || this.context);
  }

  private formatMessage(message: any): string {
    const correlationId = this.contextService.correlationId;
    const prefix = correlationId ? \`[CorrID: \${correlationId}]\` : '';
    return \`\${prefix} \${typeof message === 'object' ? JSON.stringify(message) : message}\`;
  }
}
`,
    [path.join(CORE_DIR, 'outbox', 'outbox.service.ts')]: `
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
`,
    [path.join(CORE_DIR, 'outbox', 'outbox-relay.worker.ts')]: `
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

      this.logger.log(\`Relaying \${messages.length} messages from outbox...\`);

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
             } catch (err) {
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
                    error: err.message,
                  }
                });
             }
           }
        });
      }
    } catch (e) {
      this.logger.error('Failed to relay outbox messages', e.stack);
    } finally {
      this.isProcessing = false;
    }
  }
}
`,
    [path.join(CORE_DIR, 'outbox', 'outbox.module.ts')]: `
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxService } from './outbox.service';
import { OutboxRelayWorker } from './outbox-relay.worker';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [OutboxService, OutboxRelayWorker],
  exports: [OutboxService],
})
export class OutboxModule {}
`,
    [path.join(CORE_DIR, 'health', 'health.controller.ts')]: `
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../../common/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private prismaService: PrismaService,
  ) {}

  @Get()
  check() {
    return this.health.check([
      () => this.prisma.pingCheck('database', this.prismaService),
    ]);
  }
}
`,
    [path.join(CORE_DIR, 'health', 'health.module.ts')]: `
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 1.5 core features scaffolded.');
