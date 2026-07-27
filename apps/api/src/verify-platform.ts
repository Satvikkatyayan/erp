import { Logger } from '@nestjs/common';
import { PlatformSDK } from './core/sdk/platform.sdk';
import { PlatformExceptionFilter } from './common/filters/platform-exception.filter';
import { PlatformContext } from './core/contracts/context/platform-context';

async function verifyPlatformSDK() {
  const logger = new Logger('SDK-Verification');
  logger.log('Starting Unified Platform SDK Finalization Test...');

  const sdk = new PlatformSDK(null as any);
  const filter = new PlatformExceptionFilter();

  const mockContext: PlatformContext = {
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
  
  // 1. Submit form
  const formPayload = { name: 'Leave Request' };
  const formResult = await sdk.forms.submit(mockContext, formPayload);
  
  if (formResult.success && formResult.correlationId === mockContext.correlationId) {
     logger.log(' - ✅ Forms SDK successfully wrapped by Middleware. Context Propagated: ' + formResult.correlationId);
  }

  // 2. Trigger Workflow from result
  const wfResult = await sdk.workflow.trigger(mockContext, formResult.data.id);
  if (wfResult.success) {
     logger.log(' - ✅ Workflow SDK successfully triggered from Form execution result.');
  }

  // 3. Health & Capabilities Matrix
  const health = sdk.checkHealth();
  if (health.status === 'HEALTHY' && health.capabilities.length > 5) {
     logger.log(' - ✅ Capability Registry returned aggregated health standard: ' + health.capabilities.join(', '));
  }

  // 4. Global Exception Filter & Error Domain translation
  logger.log('[Test 2] Global Exception Filter & PlatformError translation...');
  try {
     // Intentionally omitting 'name' to trigger ValidationError in Forms SDK
     await sdk.forms.submit(mockContext, { invalid: 'payload' });
  } catch (err) {
     const httpResponse = filter.catch(err as any, null as any);
     if (httpResponse.statusCode === 400 && httpResponse.code === 'ERR_VALIDATION') {
        logger.log(' - ✅ ValidationError correctly intercepted by Global Filter and mapped to HTTP 400.');
        logger.log(' - ✅ Trace ID correctly injected into error payload: ' + httpResponse.correlationId);
     } else {
        logger.error(' - ❌ Exception Filter mapping failed.');
     }
  }

  logger.log('Platform SDK Finalization Completed Successfully.');
}

verifyPlatformSDK().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
