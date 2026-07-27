import { OutboundIntegrationPipeline } from '../pipeline/outbound-pipeline';
import { WebhookVerifier } from '../webhooks/webhook-verifier';
export declare class PlatformIntegrationSDK {
    private outboundPipeline;
    private webhookVerifier;
    constructor(outboundPipeline: OutboundIntegrationPipeline, webhookVerifier: WebhookVerifier);
    send(integrationConfig: any, rawPayload: any): Promise<any>;
    receiveWebhook(rawPayload: string, headers: any, secret: string): boolean;
}
//# sourceMappingURL=platform-integration.sdk.d.ts.map