import { CommunicationProviderInterface } from '../contracts/communication-provider.interface';
import { RenderResult } from '../services/template-rendering.service';

export interface TwilioConfiguration {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

export class TwilioProvider implements CommunicationProviderInterface {
  constructor(private readonly config: TwilioConfiguration) {
    Object.freeze(this.config);
  }

  async send(payload: RenderResult): Promise<void> {
    if (!payload || !payload.renderedBody) {
      throw new Error('TWILIO_VALIDATION_ERROR: Missing body in RenderResult');
    }

    try {
      // SDK Encapsulation: In a real implementation, Twilio SDK logic goes here.
      // const client = twilio(this.config.accountSid, this.config.authToken);
      // await client.messages.create({
      //   body: payload.body,
      //   from: this.config.fromNumber,
      //   to: payload.metadata?.recipient
      // });
      
      // Simulating successful network transmission
      return Promise.resolve();
    } catch (error: any) {
      // Propagate native SDK/Transport failures directly without masking
      throw new Error(`TWILIO_TRANSPORT_ERROR: ${error.message}`);
    }
  }
}
