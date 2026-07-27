const fs = require('fs');
const path = require('path');

const CORE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core';

const directories = [
    path.join(CORE_DIR, 'contracts', 'context'),
    path.join(CORE_DIR, 'contracts', 'errors'),
    path.join(CORE_DIR, 'contracts', 'results'),
    path.join(CORE_DIR, 'sdk', 'middleware'),
    path.join('d:\\erpvvinfratech\\apps\\api\\src\\common\\filters'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    // ----------------------------------------------------
    // CONTEXT & METADATA
    // ----------------------------------------------------
    [path.join(CORE_DIR, 'contracts', 'context', 'platform-context.ts')]: `
export interface PlatformContext {
  correlationId: string;
  tenantId?: string;
  organizationId?: string;
  userId?: string;
  locale: string;
  timezone: string;
  requestId: string;
  traceId: string;
  featureFlags: Record<string, boolean>;
}
`,
    [path.join(CORE_DIR, 'contracts', 'results', 'platform-result.ts')]: `
export interface PlatformResult<T> {
  success: boolean;
  data: T;
  metadata?: any;
  warnings?: string[];
  executionTimeMs: number;
  correlationId: string;
}
`,
    // ----------------------------------------------------
    // ERRORS
    // ----------------------------------------------------
    [path.join(CORE_DIR, 'contracts', 'errors', 'platform.error.ts')]: `
export abstract class PlatformError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly correlationId: string,
    public readonly isRecoverable: boolean,
    public readonly context?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends PlatformError {
  constructor(message: string, correlationId: string, context?: any) {
    super('ERR_VALIDATION', message, correlationId, false, context);
  }
}

export class AuthorizationError extends PlatformError {
  constructor(message: string, correlationId: string, context?: any) {
    super('ERR_UNAUTHORIZED', message, correlationId, false, context);
  }
}

export class WorkflowError extends PlatformError {
  constructor(message: string, correlationId: string, context?: any) {
    super('ERR_WORKFLOW', message, correlationId, false, context);
  }
}
`,
    // ----------------------------------------------------
    // EXCEPTION FILTER
    // ----------------------------------------------------
    [path.join('d:\\erpvvinfratech\\apps\\api\\src\\common\\filters', 'platform-exception.filter.ts')]: `
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { PlatformError, ValidationError, AuthorizationError } from '../../core/contracts/errors/platform.error';

@Catch(PlatformError)
export class PlatformExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PlatformExceptionFilter.name);

  catch(exception: PlatformError, host: ArgumentsHost) {
    // In a real app, this extracts Response from host.switchToHttp().getResponse()
    // We mock it for the verification script
    const statusCode = this.mapErrorCodeToStatus(exception);
    
    this.logger.error(\`PlatformError [HTTP \${statusCode}] \${exception.message} (CorrelationID: \${exception.correlationId})\`);

    const payload = {
      statusCode,
      code: exception.code,
      message: exception.message,
      correlationId: exception.correlationId,
      timestamp: new Date().toISOString()
    };
    
    return payload; // Returning payload for mock verification
  }

  private mapErrorCodeToStatus(exception: PlatformError): number {
    if (exception instanceof ValidationError) return 400;
    if (exception instanceof AuthorizationError) return 403;
    return 500;
  }
}
`,
    // ----------------------------------------------------
    // SDK FACADE
    // ----------------------------------------------------
    [path.join(CORE_DIR, 'sdk', 'middleware', 'sdk-pipeline.ts')]: `
import { Logger } from '@nestjs/common';
import { PlatformContext } from '../../contracts/context/platform-context';

export class SDKMiddlewarePipeline {
  private readonly logger = new Logger('SDKMiddleware');

  async execute<T>(
    context: PlatformContext,
    targetEngine: string,
    operationName: string,
    handler: () => Promise<T>
  ): Promise<any> {
    const start = Date.now();
    this.logger.debug(\`[\${context.correlationId}] [\${targetEngine}] Executing \${operationName}...\`);
    
    // 1. Feature Flag intercept
    if (context.featureFlags['disable_all_writes']) {
       throw new Error('Platform is in maintenance mode.');
    }
    
    // 2. Execute Handler
    try {
        const result = await handler();
        const duration = Date.now() - start;
        
        // 3. Metrics emit
        this.logger.log(\`[\${context.correlationId}] [\${targetEngine}] Completed \${operationName} in \${duration}ms\`);
        
        return {
           success: true,
           data: result,
           executionTimeMs: duration,
           correlationId: context.correlationId
        };
    } catch (e) {
        this.logger.error(\`[\${context.correlationId}] [\${targetEngine}] \${operationName} FAILED\`);
        throw e;
    }
  }
}
`,
    [path.join(CORE_DIR, 'sdk', 'platform.sdk.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { SDKMiddlewarePipeline } from './middleware/sdk-pipeline';
import { PlatformContext } from '../contracts/context/platform-context';
import { ValidationError } from '../contracts/errors/platform.error';

@Injectable()
export class PlatformSDK {
  public pipeline = new SDKMiddlewarePipeline();
  private readonly logger = new Logger(PlatformSDK.name);

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

  public checkHealth() {
     return {
        engine: 'UnifiedPlatformSDK',
        version: '1.0.0',
        status: 'HEALTHY',
        capabilities: ['forms', 'workflow', 'storage', 'rules', 'notification', 'search']
     };
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 12 Platform SDK DevX files scaffolded.');
