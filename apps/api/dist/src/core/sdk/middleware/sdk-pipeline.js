"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDKMiddlewarePipeline = void 0;
const common_1 = require("@nestjs/common");
class SDKMiddlewarePipeline {
    constructor() {
        this.logger = new common_1.Logger('SDKMiddleware');
    }
    async execute(context, targetEngine, operationName, handler) {
        const start = Date.now();
        this.logger.debug(`[${context.correlationId}] [${targetEngine}] Executing ${operationName}...`);
        if (context.featureFlags['disable_all_writes']) {
            throw new Error('Platform is in maintenance mode.');
        }
        try {
            const result = await handler();
            const duration = Date.now() - start;
            this.logger.log(`[${context.correlationId}] [${targetEngine}] Completed ${operationName} in ${duration}ms`);
            return {
                success: true,
                data: result,
                executionTimeMs: duration,
                correlationId: context.correlationId
            };
        }
        catch (e) {
            this.logger.error(`[${context.correlationId}] [${targetEngine}] ${operationName} FAILED`);
            throw e;
        }
    }
}
exports.SDKMiddlewarePipeline = SDKMiddlewarePipeline;
//# sourceMappingURL=sdk-pipeline.js.map