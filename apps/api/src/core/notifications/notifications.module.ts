import { Module } from '@nestjs/common';
import { NodemailerProvider } from './providers/nodemailer.provider';
import { InAppProvider } from './providers/in-app.provider';
import { TemplateRenderer } from './pipeline/template.renderer';
import { PreferenceFilter } from './pipeline/preference.filter';
import { RoutingResolverService } from './routing/routing-resolver.service';
import { PlatformNotificationSDK } from './sdk/platform-notification.sdk';

@Module({
  providers: [
    NodemailerProvider,
    InAppProvider,
    TemplateRenderer,
    PreferenceFilter,
    RoutingResolverService,
    PlatformNotificationSDK
  ],
  exports: [PlatformNotificationSDK]
})
export class NotificationsModule {}
