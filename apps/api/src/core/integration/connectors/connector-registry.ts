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