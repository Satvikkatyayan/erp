import { ConnectorRegistry } from '../connectors/connector-registry';
import { DatabaseSecretProvider } from '../secrets/database-secret.provider';
import { DefaultTemplateEngine } from '../mapping/transformation.engine';
export declare class OutboundIntegrationPipeline {
    private registry;
    private secrets;
    private mapper;
    private readonly logger;
    constructor(registry: ConnectorRegistry, secrets: DatabaseSecretProvider, mapper: DefaultTemplateEngine);
    execute(integrationConfig: any, rawPayload: any): Promise<any>;
}
//# sourceMappingURL=outbound-pipeline.d.ts.map