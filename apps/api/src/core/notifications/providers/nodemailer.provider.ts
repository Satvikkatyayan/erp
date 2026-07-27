import { Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from './notification-provider.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerProvider implements INotificationProvider {
  private readonly logger = new Logger(NodemailerProvider.name);
  
  async send(payload: any): Promise<boolean> {
    this.logger.log(`Sending Email via Nodemailer to ${payload.recipientId}`);
    // Mock transport for Stage 4 validation
    if (payload.recipientId === 'FAIL_ME') {
      throw new Error('SMTP Connection Refused (Mocked Failure)');
    }
    return true;
  }
}