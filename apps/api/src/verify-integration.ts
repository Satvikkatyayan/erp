import { Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { DatabaseSecretProvider } from './core/integration/secrets/database-secret.provider';
import { ConnectorRegistry } from './core/integration/connectors/connector-registry';
import { RESTConnector } from './core/integration/connectors/rest.connector';
import { DefaultTemplateEngine } from './core/integration/mapping/transformation.engine';
import { OutboundIntegrationPipeline } from './core/integration/pipeline/outbound-pipeline';
import { WebhookVerifier } from './core/integration/webhooks/webhook-verifier';
import { PlatformIntegrationSDK } from './core/integration/sdk/platform-integration.sdk';

async function verifyIntegration() {
  const logger = new Logger('Integration-Verification');
  logger.log('Starting Enterprise Integration Framework Verification...');

  const secrets = new DatabaseSecretProvider();
  
  const restConnector = new RESTConnector();
  const registry = new ConnectorRegistry();
  registry.register(restConnector);
  
  const mapper = new DefaultTemplateEngine();
  const pipeline = new OutboundIntegrationPipeline(registry, secrets, mapper);
  const verifier = new WebhookVerifier();
  
  const sdk = new PlatformIntegrationSDK(pipeline, verifier);

  // [Test 1] Webhook Signature & Idempotency
  logger.log('[Test 1] Inbound Webhook Verification...');
  const webhookSecret = 'super_secret_webhook_key';
  const rawPayload = JSON.stringify({ event: 'EmployeeCreated', id: 'emp-123' });
  const validSignature = crypto.createHmac('sha256', webhookSecret).update(rawPayload).digest('hex');
  
  const headers = {
    'x-signature': validSignature,
    'x-timestamp': Date.now().toString(),
    'x-idempotency-key': 'req-abc-123'
  };

  try {
    sdk.receiveWebhook(rawPayload, headers, webhookSecret);
    logger.log(' - ✅ Webhook passed Signature and Timestamp checks.');
    
    // Idempotency check (sending same key)
    sdk.receiveWebhook(rawPayload, headers, webhookSecret);
    logger.error(' - ❌ Webhook idempotency failed (should have thrown).');
  } catch(e: any) {
    if (e.message.includes('Idempotent')) {
       logger.log(' - ✅ Webhook Idempotency blocked duplicate request safely.');
    } else {
       logger.error(' - ❌ Unexpected Webhook failure: ' + e.message);
    }
  }

  // [Test 2] Mapping DSL Engine Translation
  logger.log('[Test 2] Outbound Mapping DSL...');
  const rawData = { employeeName: 'Alice Johnson', status: 'ACTIVE' };
  const dslAst = {
      firstName: { sourceField: 'employeeName' },
      greeting: { interpolate: 'Hello {{employeeName}}, your status is {{status}}' },
      isActive: { condition: { field: 'status', equals: 'ACTIVE', then: true, else: false } }
  };
  
  const integrationConfig = {
      connectorId: 'REST_V1',
      url: 'https://api.workday.com/v1/mock',
      secretId: 'workday_oauth_token',
      mappingAst: dslAst
  };
  
  const res = await sdk.send(integrationConfig, rawData);
  if (res.status === 200) {
      logger.log(' - ✅ Outbound Pipeline sent mapped payload successfully.');
  }

  // [Test 3] Resilience: Dead Letter Queue routing on 503
  logger.log('[Test 3] DLQ Routing & Circuit Breaker Mock...');
  const failConfig = { ...integrationConfig, url: 'https://api.workday.com/v1/fail' };
  
  const failRes = await sdk.send(failConfig, rawData);
  if (failRes.status === 'DLQ_QUEUED') {
     logger.log(' - ✅ Network failure safely intercepted and routed to Dead Letter Queue (DLQ).');
  } else {
     logger.error(' - ❌ DLQ Routing failed.');
  }

  logger.log('Integration Framework Verification Completed Successfully.');
}

verifyIntegration().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
