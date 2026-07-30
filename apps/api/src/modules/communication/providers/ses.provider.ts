import { CommunicationProviderInterface } from '../contracts/communication-provider.interface';
import { RenderResult } from '../services/template-rendering.service';

export interface SesConfiguration {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export class SesProvider implements CommunicationProviderInterface {
  constructor(private readonly config: SesConfiguration) {
    Object.freeze(this.config);
  }

  async send(payload: RenderResult): Promise<void> {
    if (!payload || !payload.renderedSubject || !payload.renderedBody) {
      throw new Error('SES_VALIDATION_ERROR: Missing required fields in RenderResult');
    }

    try {
      // SDK Encapsulation: In a real implementation, AWS SDK logic goes here.
      // const ses = new AWS.SES({ ...this.config });
      // await ses.sendEmail({
      //   Destination: { ToAddresses: [payload.metadata?.recipient] },
      //   Message: {
      //     Body: { Html: { Data: payload.body } },
      //     Subject: { Data: payload.subject },
      //   },
      //   Source: 'system@erp.com',
      // }).promise();
      
      // Simulating successful network transmission
      return Promise.resolve();
    } catch (error: any) {
      // Propagate native SDK/Transport failures directly without masking
      throw new Error(`SES_TRANSPORT_ERROR: ${error.message}`);
    }
  }
}
