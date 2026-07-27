import { Injectable, Logger } from '@nestjs/common';
import { RoutingResolverService } from '../routing/routing-resolver.service';

@Injectable()
export class PlatformNotificationSDK {
  private readonly logger = new Logger(PlatformNotificationSDK.name);
  
  constructor(private router: RoutingResolverService) {}

  async send(eventKey: string, payload: any) {
    const recipients = this.router.resolveRecipients(eventKey, payload);
    this.logger.log(`Queueing Notification for [${eventKey}] -> ${recipients.join(', ')}`);
    return { status: 'QUEUED', recipients };
  }
  
  async broadcast(eventKey: string, payload: any, recipients: string[]) {
    this.logger.log(`Broadcasting Notification to ${recipients.length} recipients`);
    return { status: 'BATCH_QUEUED', count: recipients.length };
  }
}