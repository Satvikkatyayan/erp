const fs = require('fs');
const path = require('path');

const INT_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\integration';

const directories = [
    path.join(INT_DIR, 'secrets'),
    path.join(INT_DIR, 'connectors'),
    path.join(INT_DIR, 'mapping'),
    path.join(INT_DIR, 'pipeline'),
    path.join(INT_DIR, 'webhooks'),
    path.join(INT_DIR, 'sdk'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    // ----------------------------------------------------
    // SECRETS
    // ----------------------------------------------------
    [path.join(INT_DIR, 'secrets', 'secret-provider.interface.ts')]: `
export interface ISecretProvider {
  getSecret(secretId: string): Promise<string>;
  setSecret(secretId: string, value: string): Promise<void>;
}
`,
    [path.join(INT_DIR, 'secrets', 'database-secret.provider.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { ISecretProvider } from './secret-provider.interface';

@Injectable()
export class DatabaseSecretProvider implements ISecretProvider {
  private readonly logger = new Logger(DatabaseSecretProvider.name);

  async getSecret(secretId: string): Promise<string> {
    this.logger.debug(\`Retrieving secret [\${secretId}] from Database/KMS mock\`);
    // Mock decryption logic
    return \`decrypted_token_\${secretId}\`;
  }
  
  async setSecret(secretId: string, value: string): Promise<void> {
    this.logger.debug(\`Storing rotated secret [\${secretId}] to Database mock\`);
  }
}
`,
    // ----------------------------------------------------
    // CONNECTORS
    // ----------------------------------------------------
    [path.join(INT_DIR, 'connectors', 'integration-connector.interface.ts')]: `
export interface IIntegrationConnector {
  id: string;
  version: string;
  
  initialize(): Promise<void>;
  validateConfiguration(config: any): boolean;
  testConnection(config: any): Promise<boolean>;
  healthCheck(): Promise<"HEALTHY" | "DEGRADED" | "UNAVAILABLE">;
  
  send(payload: any, config: any, credentials: any): Promise<any>;
  
  disconnect(): Promise<void>;
  shutdown(): Promise<void>;
}
`,
    [path.join(INT_DIR, 'connectors', 'connector-registry.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { IIntegrationConnector } from './integration-connector.interface';

@Injectable()
export class ConnectorRegistry {
  private connectors = new Map<string, IIntegrationConnector>();
  
  register(connector: IIntegrationConnector) {
    this.connectors.set(connector.id, connector);
  }
  
  get(id: string): IIntegrationConnector {
    return this.connectors.get(id);
  }
}
`,
    [path.join(INT_DIR, 'connectors', 'rest.connector.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { IIntegrationConnector } from './integration-connector.interface';

@Injectable()
export class RESTConnector implements IIntegrationConnector {
  id = 'REST_V1';
  version = '1.0.0';
  private readonly logger = new Logger(RESTConnector.name);

  async initialize() { this.logger.debug('REST Connector Initialized'); }
  validateConfiguration(config: any) { return !!config.url; }
  async testConnection(config: any) { return true; }
  
  async healthCheck(): Promise<"HEALTHY" | "DEGRADED" | "UNAVAILABLE"> {
    return "HEALTHY";
  }
  
  async send(payload: any, config: any, credentials: any) {
    this.logger.log(\`Sending payload to \${config.url} via REST... Auth: Bearer \${credentials}\`);
    // Mock Network Error to trigger DLQ
    if (config.url.includes('fail')) {
        throw new Error('503 Service Unavailable');
    }
    return { status: 200, data: { success: true } };
  }
  
  async disconnect() {}
  async shutdown() {}
}
`,
    // ----------------------------------------------------
    // MAPPING ENGINE (DSL)
    // ----------------------------------------------------
    [path.join(INT_DIR, 'mapping', 'transformation.engine.ts')]: `
import { Injectable, Logger } from '@nestjs/common';

export interface ITransformationEngine {
  transform(payload: any, mappingAst: any): any;
}

@Injectable()
export class DefaultTemplateEngine implements ITransformationEngine {
  private readonly logger = new Logger(DefaultTemplateEngine.name);

  transform(payload: any, mappingAst: any): any {
    this.logger.debug('Executing declarative Mapping DSL...');
    const result: any = {};
    
    for (const key of Object.keys(mappingAst)) {
      const rule = mappingAst[key];
      
      // Field Mapping
      if (rule.sourceField) {
        result[key] = payload[rule.sourceField] ?? rule.defaultValue;
      }
      // String Interpolation
      else if (rule.interpolate) {
        // Very basic mock interpolation "{{firstName}} {{lastName}}"
        let str = rule.interpolate;
        for (const pKey of Object.keys(payload)) {
           str = str.replace(\`{{\${pKey}}}\`, payload[pKey]);
        }
        result[key] = str;
      }
      // Conditional Output
      else if (rule.condition) {
         if (payload[rule.condition.field] === rule.condition.equals) {
             result[key] = rule.condition.then;
         } else {
             result[key] = rule.condition.else;
         }
      }
    }
    return result;
  }
}
`,
    // ----------------------------------------------------
    // OUTBOUND PIPELINE
    // ----------------------------------------------------
    [path.join(INT_DIR, 'pipeline', 'outbound-pipeline.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { ConnectorRegistry } from '../connectors/connector-registry';
import { DatabaseSecretProvider } from '../secrets/database-secret.provider';
import { DefaultTemplateEngine } from '../mapping/transformation.engine';

@Injectable()
export class OutboundIntegrationPipeline {
  private readonly logger = new Logger(OutboundIntegrationPipeline.name);

  constructor(
    private registry: ConnectorRegistry,
    private secrets: DatabaseSecretProvider,
    private mapper: DefaultTemplateEngine
  ) {}

  async execute(integrationConfig: any, rawPayload: any) {
    try {
      // 1. Mapping
      const mappedPayload = this.mapper.transform(rawPayload, integrationConfig.mappingAst);
      
      // 2. Validation
      if (!integrationConfig.url) throw new Error('Validation failed: Missing URL');
      
      // 3. Secret Injection
      const credentials = await this.secrets.getSecret(integrationConfig.secretId);
      
      // 4. Rate Limiter (Mock)
      this.logger.debug('Passed Rate Limiter');
      
      // 5. Circuit Breaker (Mock)
      this.logger.debug('Circuit Breaker CLOSED (Healthy)');
      
      // 6. Connector Execution
      const connector = this.registry.get(integrationConfig.connectorId);
      const response = await connector.send(mappedPayload, integrationConfig, credentials);
      
      // 7. Audit Logging
      this.logger.debug('Integration Audit: Success logged.');
      
      return response;
      
    } catch (e) {
      // 8. DLQ Routing
      this.logger.error(\`Integration Failed: \${e.message}\`);
      this.logger.warn('Routing payload to Dead Letter Queue (IntegrationRetryDLQ)...');
      return { status: 'DLQ_QUEUED', error: e.message };
    }
  }
}
`,
    // ----------------------------------------------------
    // INBOUND WEBHOOK VERIFICATION
    // ----------------------------------------------------
    [path.join(INT_DIR, 'webhooks', 'webhook-verifier.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class WebhookVerifier {
  private readonly logger = new Logger(WebhookVerifier.name);
  private idempotencyCache = new Set<string>();

  verify(payload: string, headers: any, secret: string) {
    // 1. Signature
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (headers['x-signature'] !== expectedSignature) {
        throw new Error('Invalid Webhook Signature');
    }
    
    // 2. Idempotency
    const idempotencyKey = headers['x-idempotency-key'];
    if (idempotencyKey) {
        if (this.idempotencyCache.has(idempotencyKey)) {
            throw new Error('Idempotent Replay Detected - Dropping Payload');
        }
        this.idempotencyCache.add(idempotencyKey);
    }
    
    // 3. Replay Protection (Timestamp)
    const ts = parseInt(headers['x-timestamp'], 10);
    if (Date.now() - ts > 300000) { // 5 mins
        throw new Error('Webhook Timestamp expired (Replay Attack)');
    }
    
    this.logger.debug('Webhook Verified Successfully.');
    return true;
  }
}
`,
    // ----------------------------------------------------
    // PLATFORM SDK
    // ----------------------------------------------------
    [path.join(INT_DIR, 'sdk', 'platform-integration.sdk.ts')]: `
import { Injectable } from '@nestjs/common';
import { OutboundIntegrationPipeline } from '../pipeline/outbound-pipeline';
import { WebhookVerifier } from '../webhooks/webhook-verifier';

@Injectable()
export class PlatformIntegrationSDK {
  constructor(
    private outboundPipeline: OutboundIntegrationPipeline,
    private webhookVerifier: WebhookVerifier
  ) {}

  async send(integrationConfig: any, rawPayload: any) {
    return this.outboundPipeline.execute(integrationConfig, rawPayload);
  }
  
  receiveWebhook(rawPayload: string, headers: any, secret: string) {
    return this.webhookVerifier.verify(rawPayload, headers, secret);
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 10 Integration Platform files scaffolded.');
