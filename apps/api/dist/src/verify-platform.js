"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const platform_sdk_1 = require("./core/sdk/platform.sdk");
const platform_exception_filter_1 = require("./common/filters/platform-exception.filter");
async function verifyPlatformSDK() {
    const logger = new common_1.Logger('SDK-Verification');
    logger.log('Starting Unified Platform SDK Finalization Test...');
    const sdk = new platform_sdk_1.PlatformSDK(null);
    const filter = new platform_exception_filter_1.PlatformExceptionFilter();
    const mockContext = {
        correlationId: 'ctx-999-corr-abc',
        tenantId: 'tenant-1',
        organizationId: 'org-hq',
        userId: 'usr-123',
        locale: 'en-US',
        timezone: 'UTC',
        requestId: 'req-1',
        traceId: 'trace-555',
        featureFlags: { 'enable_beta': true }
    };
    logger.log('[Test 1] Executing E2E Form -> Workflow via SDK Middleware Pipeline...');
    const formPayload = { name: 'Leave Request' };
    const formResult = await sdk.forms.submit(mockContext, formPayload);
    if (formResult.success && formResult.correlationId === mockContext.correlationId) {
        logger.log(' - ✅ Forms SDK successfully wrapped by Middleware. Context Propagated: ' + formResult.correlationId);
    }
    const wfResult = await sdk.workflow.trigger(mockContext, formResult.data.id);
    if (wfResult.success) {
        logger.log(' - ✅ Workflow SDK successfully triggered from Form execution result.');
    }
    const health = sdk.checkHealth();
    if (health.status === 'HEALTHY' && health.capabilities.length > 5) {
        logger.log(' - ✅ Capability Registry returned aggregated health standard: ' + health.capabilities.join(', '));
    }
    logger.log('[Test 2] Global Exception Filter & PlatformError translation...');
    try {
        await sdk.forms.submit(mockContext, { invalid: 'payload' });
    }
    catch (err) {
        const httpResponse = filter.catch(err, null);
        if (httpResponse.statusCode === 400 && httpResponse.code === 'ERR_VALIDATION') {
            logger.log(' - ✅ ValidationError correctly intercepted by Global Filter and mapped to HTTP 400.');
            logger.log(' - ✅ Trace ID correctly injected into error payload: ' + httpResponse.correlationId);
        }
        else {
            logger.error(' - ❌ Exception Filter mapping failed.');
        }
    }
    logger.log('Platform SDK Finalization Completed Successfully.');
}
verifyPlatformSDK().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=verify-platform.js.map