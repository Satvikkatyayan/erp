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
    this.logger.log(`Sending payload to ${config.url} via REST... Auth: Bearer ${credentials}`);
    // Mock Network Error to trigger DLQ
    if (config.url.includes('fail')) {
        throw new Error('503 Service Unavailable');
    }
    return { status: 200, data: { success: true } };
  }
  
  async disconnect() {}
  async shutdown() {}
}