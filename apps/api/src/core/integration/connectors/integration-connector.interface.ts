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