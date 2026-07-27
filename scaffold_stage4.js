const fs = require('fs');
const path = require('path');

const NOTIF_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\notifications';

const directories = [
    path.join(NOTIF_DIR, 'providers'),
    path.join(NOTIF_DIR, 'pipeline'),
    path.join(NOTIF_DIR, 'sdk'),
    path.join(NOTIF_DIR, 'api'),
    path.join(NOTIF_DIR, 'routing'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(NOTIF_DIR, 'providers', 'notification-provider.interface.ts')]: `
export interface INotificationProvider {
  send(payload: any): Promise<boolean>;
}
`,
    [path.join(NOTIF_DIR, 'providers', 'nodemailer.provider.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from './notification-provider.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerProvider implements INotificationProvider {
  private readonly logger = new Logger(NodemailerProvider.name);
  
  async send(payload: any): Promise<boolean> {
    this.logger.log(\`Sending Email via Nodemailer to \${payload.recipientId}\`);
    // Mock transport for Stage 4 validation
    if (payload.recipientId === 'FAIL_ME') {
      throw new Error('SMTP Connection Refused (Mocked Failure)');
    }
    return true;
  }
}
`,
    [path.join(NOTIF_DIR, 'providers', 'in-app.provider.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { INotificationProvider } from './notification-provider.interface';

@Injectable()
export class InAppProvider implements INotificationProvider {
  private readonly logger = new Logger(InAppProvider.name);
  
  async send(payload: any): Promise<boolean> {
    this.logger.log(\`Sending In-App Notification to \${payload.recipientId}\`);
    return true;
  }
}
`,
    [path.join(NOTIF_DIR, 'pipeline', 'template.renderer.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateRenderer {
  render(templateString: string, variables: any): string {
    // Basic mock handlebar substitution
    return templateString.replace(/\\{\\{([^}]+)\\}\\}/g, (match, key) => {
      const keys = key.split('.');
      let val = variables;
      for (const k of keys) { val = val?.[k]; }
      return val || match;
    });
  }
}
`,
    [path.join(NOTIF_DIR, 'pipeline', 'preference.filter.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class PreferenceFilter {
  shouldSuppress(channel: string, priority: string, userPreferences: any): boolean {
    if (priority === 'CRITICAL') return false; // Never suppress critical
    if (userPreferences?.mutedChannels?.includes(channel)) return true;
    
    // Quiet hours check mock
    const isQuietHours = userPreferences?.inQuietHours === true;
    if (isQuietHours) return true;
    
    return false;
  }
}
`,
    [path.join(NOTIF_DIR, 'routing', 'routing-resolver.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutingResolverService {
  resolveRecipients(eventKey: string, context: any): string[] {
    // Mock dynamic routing evaluation
    if (eventKey === 'EXPENSE_SUBMITTED') {
      return ['ManagerId123', 'FinanceId456']; // Resolving array dynamically
    }
    return [context.userId]; // Default fallback
  }
}
`,
    [path.join(NOTIF_DIR, 'sdk', 'platform-notification.sdk.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { RoutingResolverService } from '../routing/routing-resolver.service';

@Injectable()
export class PlatformNotificationSDK {
  private readonly logger = new Logger(PlatformNotificationSDK.name);
  
  constructor(private router: RoutingResolverService) {}

  async send(eventKey: string, payload: any) {
    const recipients = this.router.resolveRecipients(eventKey, payload);
    this.logger.log(\`Queueing Notification for [\${eventKey}] -> \${recipients.join(', ')}\`);
    return { status: 'QUEUED', recipients };
  }
  
  async broadcast(eventKey: string, payload: any, recipients: string[]) {
    this.logger.log(\`Broadcasting Notification to \${recipients.length} recipients\`);
    return { status: 'BATCH_QUEUED', count: recipients.length };
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 4 Notification Platform files scaffolded.');
