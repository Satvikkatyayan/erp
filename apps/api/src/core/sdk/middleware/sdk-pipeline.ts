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
    this.logger.debug(`[${context.correlationId}] [${targetEngine}] Executing ${operationName}...`);
    
    // 1. Feature Flag intercept
    if (context.featureFlags['disable_all_writes']) {
       throw new Error('Platform is in maintenance mode.');
    }
    
    // 2. Execute Handler
    try {
        const result = await handler();
        const duration = Date.now() - start;
        
        // 3. Metrics emit
        this.logger.log(`[${context.correlationId}] [${targetEngine}] Completed ${operationName} in ${duration}ms`);
        
        return {
           success: true,
           data: result,
           executionTimeMs: duration,
           correlationId: context.correlationId
        };
    } catch (e) {
        this.logger.error(`[${context.correlationId}] [${targetEngine}] ${operationName} FAILED`);
        throw e;
    }
  }
}