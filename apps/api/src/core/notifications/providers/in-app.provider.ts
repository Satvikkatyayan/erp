import { Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from './notification-provider.interface';

@Injectable()
export class InAppProvider implements INotificationProvider {
  private readonly logger = new Logger(InAppProvider.name);
  
  async send(payload: any): Promise<boolean> {
    this.logger.log(`Sending In-App Notification to ${payload.recipientId}`);
    return true;
  }
}