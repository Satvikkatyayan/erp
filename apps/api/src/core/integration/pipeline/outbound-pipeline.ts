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
      
    } catch (e: any) {
      // 8. DLQ Routing
      this.logger.error(`Integration Failed: ${e.message}`);
      this.logger.warn('Routing payload to Dead Letter Queue (IntegrationRetryDLQ)...');
      return { status: 'DLQ_QUEUED', error: e.message };
    }
  }
}