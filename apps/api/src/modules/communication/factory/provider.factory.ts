import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ProviderRegistryInterface } from '../contracts/provider-registry.interface';
import { SmtpProvider } from '../providers/smtp.provider';
import { SesProvider } from '../providers/ses.provider';
import { TwilioProvider } from '../providers/twilio.provider';
import { Channel } from '../domain/channel.enum';

@Injectable()
export class ProviderFactory implements OnModuleInit {
  constructor(
    @Inject('ProviderRegistryInterface')
    private readonly registry: ProviderRegistryInterface,
    private readonly smtpProvider: SmtpProvider,
    private readonly sesProvider: SesProvider,
    private readonly twilioProvider: TwilioProvider
  ) {}

  onModuleInit(): void {
    this.initializeProviders();
  }
  
  initializeProviders(): void {
    this.registry.register({
      provider: this.smtpProvider,
      descriptor: {
        name: 'smtp-provider',
        type: 'email',
        version: '1.0.0',
        enabled: true,
        priority: 1
      },
      capabilities: {
        supportedChannels: [Channel.EMAIL],
        supportsHtml: true,
        supportsAttachments: true,
        supportsRichMedia: false,
        supportsNativeTemplates: false
      }
    });

    this.registry.register({
      provider: this.sesProvider,
      descriptor: {
        name: 'ses-provider',
        type: 'email',
        version: '1.0.0',
        enabled: true,
        priority: 2 // fallback
      },
      capabilities: {
        supportedChannels: [Channel.EMAIL],
        supportsHtml: true,
        supportsAttachments: true,
        supportsRichMedia: false,
        supportsNativeTemplates: false
      }
    });

    this.registry.register({
      provider: this.twilioProvider,
      descriptor: {
        name: 'twilio-provider',
        type: 'sms',
        version: '1.0.0',
        enabled: true,
        priority: 1
      },
      capabilities: {
        supportedChannels: [Channel.SMS],
        supportsHtml: false,
        supportsAttachments: false,
        supportsRichMedia: false,
        supportsNativeTemplates: false
      }
    });
  }
}
