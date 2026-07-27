import { Injectable, Logger } from '@nestjs/common';
import { SDKMiddlewarePipeline } from './middleware/sdk-pipeline';
import { PlatformContext } from '../contracts/context/platform-context';
import { ValidationError } from '../contracts/errors/platform.error';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PlatformSDK {
  public pipeline = new SDKMiddlewarePipeline();
  private readonly logger = new Logger(PlatformSDK.name);

  constructor(private readonly prisma: PrismaService) {}

  // Mocks for all engine facades bound by Middleware
  public forms = {
     submit: (ctx: PlatformContext, payload: any) => 
        this.pipeline.execute(ctx, 'FormsEngine', 'submit', async () => {
           if (!payload.name) throw new ValidationError('Name is required on form submission.', ctx.correlationId);
           return { id: 'form-123', status: 'SUBMITTED' };
        })
  };

  public workflow = {
     trigger: (ctx: PlatformContext, docId: string) => 
        this.pipeline.execute(ctx, 'WorkflowEngine', 'trigger', async () => {
           return { workflowId: 'wf-999', status: 'IN_PROGRESS' };
        })
  };

  public rules = {
     evaluate: async (ctx: PlatformContext, policyName: string, inputs: any) => 
        this.pipeline.execute(ctx, 'RulesEngine', 'evaluate', async () => {
           return { prefix: 'EMP' };
        })
  };

  public events = {
     publish: async (ctx: PlatformContext, eventName: string, payload: any) =>
        this.pipeline.execute(ctx, 'EventBus', 'publish', async () => {
           await this.prisma.outboxMessage.create({
             data: { eventName, payload: payload || {}, correlationId: ctx.correlationId, state: 'PENDING' }
           });
           return { status: 'PUBLISHED' };
        })
  };

  public search = {
     index: async (ctx: PlatformContext, indexName: string, docId: string, payload: any) =>
        this.pipeline.execute(ctx, 'SearchEngine', 'index', async () => {
           return { status: 'INDEXED' };
        })
  };

  public reporting = {
     registerDataset: async (ctx: PlatformContext, datasetName: string, schema: any) =>
        this.pipeline.execute(ctx, 'ReportingEngine', 'registerDataset', async () => {
           return { status: 'REGISTERED' };
        })
  };

  public checkHealth() {
     return {
        engine: 'UnifiedPlatformSDK',
        version: '1.0.0',
        status: 'HEALTHY',
        capabilities: ['forms', 'workflow', 'storage', 'rules', 'notification', 'search', 'reporting']
     };
  }
}