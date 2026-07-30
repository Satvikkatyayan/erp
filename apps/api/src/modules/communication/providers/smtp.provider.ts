import { CommunicationProviderInterface } from '../contracts/communication-provider.interface';
import { RenderResult } from '../services/template-rendering.service';

export interface SmtpConfiguration {
  host: string;
  port: number;
  secure: boolean;
  authUser: string;
  authPass: string;
}

export class SmtpProvider implements CommunicationProviderInterface {
  constructor(private readonly config: SmtpConfiguration) {
    Object.freeze(this.config);
  }

  async send(payload: RenderResult): Promise<void> {
    if (!payload || !payload.renderedSubject || !payload.renderedBody) {
      throw new Error('SMTP_VALIDATION_ERROR: Missing required fields in RenderResult');
    }

    try {
      // SDK Encapsulation: In a real implementation, nodemailer logic goes here.
      // const transporter = nodemailer.createTransport({ ...this.config });
      // await transporter.sendMail({
      //   from: 'system@erp.com',
      //   to: payload.metadata?.recipient,
      //   subject: payload.subject,
      //   html: payload.body,
      // });
      
      // Simulating successful network transmission
      return Promise.resolve();
    } catch (error: any) {
      // Propagate native SDK/Transport failures directly without masking
      throw new Error(`SMTP_TRANSPORT_ERROR: ${error.message}`);
    }
  }
}
