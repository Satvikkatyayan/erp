import { IIntegrationConnector } from './integration-connector.interface';
export declare class ConnectorRegistry {
    private connectors;
    register(connector: IIntegrationConnector): void;
    get(id: string): IIntegrationConnector;
}
//# sourceMappingURL=connector-registry.d.ts.map