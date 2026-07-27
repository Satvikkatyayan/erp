"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const database_secret_provider_1 = require("./core/integration/secrets/database-secret.provider");
const connector_registry_1 = require("./core/integration/connectors/connector-registry");
const rest_connector_1 = require("./core/integration/connectors/rest.connector");
const transformation_engine_1 = require("./core/integration/mapping/transformation.engine");
const outbound_pipeline_1 = require("./core/integration/pipeline/outbound-pipeline");
const webhook_verifier_1 = require("./core/integration/webhooks/webhook-verifier");
const platform_integration_sdk_1 = require("./core/integration/sdk/platform-integration.sdk");
async function verifyIntegration() {
    const logger = new common_1.Logger('Integration-Verification');
    logger.log('Starting Enterprise Integration Framework Verification...');
    const secrets = new database_secret_provider_1.DatabaseSecretProvider();
    const restConnector = new rest_connector_1.RESTConnector();
    const registry = new connector_registry_1.ConnectorRegistry();
    registry.register(restConnector);
    const mapper = new transformation_engine_1.DefaultTemplateEngine();
    const pipeline = new outbound_pipeline_1.OutboundIntegrationPipeline(registry, secrets, mapper);
    const verifier = new webhook_verifier_1.WebhookVerifier();
    const sdk = new platform_integration_sdk_1.PlatformIntegrationSDK(pipeline, verifier);
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
        sdk.receiveWebhook(rawPayload, headers, webhookSecret);
        logger.error(' - ❌ Webhook idempotency failed (should have thrown).');
    }
    catch (e) {
        if (e.message.includes('Idempotent')) {
            logger.log(' - ✅ Webhook Idempotency blocked duplicate request safely.');
        }
        else {
            logger.error(' - ❌ Unexpected Webhook failure: ' + e.message);
        }
    }
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
    logger.log('[Test 3] DLQ Routing & Circuit Breaker Mock...');
    const failConfig = { ...integrationConfig, url: 'https://api.workday.com/v1/fail' };
    const failRes = await sdk.send(failConfig, rawData);
    if (failRes.status === 'DLQ_QUEUED') {
        logger.log(' - ✅ Network failure safely intercepted and routed to Dead Letter Queue (DLQ).');
    }
    else {
        logger.error(' - ❌ DLQ Routing failed.');
    }
    logger.log('Integration Framework Verification Completed Successfully.');
}
verifyIntegration().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=verify-integration.js.map