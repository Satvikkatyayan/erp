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