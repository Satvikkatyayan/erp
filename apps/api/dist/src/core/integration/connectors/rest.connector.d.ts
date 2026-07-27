import { IIntegrationConnector } from './integration-connector.interface';
export declare class RESTConnector implements IIntegrationConnector {
    id: string;
    version: string;
    private readonly logger;
    initialize(): Promise<void>;
    validateConfiguration(config: any): boolean;
    testConnection(config: any): Promise<boolean>;
    healthCheck(): Promise<"HEALTHY" | "DEGRADED" | "UNAVAILABLE">;
    send(payload: any, config: any, credentials: any): Promise<{
        status: number;
        data: {
            success: boolean;
        };
    }>;
    disconnect(): Promise<void>;
    shutdown(): Promise<void>;
}
//# sourceMappingURL=rest.connector.d.ts.map