import { OnModuleInit } from '@nestjs/common';
import { ProviderRegistryInterface } from '../contracts/provider-registry.interface';
import { SmtpProvider } from '../providers/smtp.provider';
import { SesProvider } from '../providers/ses.provider';
import { TwilioProvider } from '../providers/twilio.provider';
export declare class ProviderFactory implements OnModuleInit {
    private readonly registry;
    private readonly smtpProvider;
    private readonly sesProvider;
    private readonly twilioProvider;
    constructor(registry: ProviderRegistryInterface, smtpProvider: SmtpProvider, sesProvider: SesProvider, twilioProvider: TwilioProvider);
    onModuleInit(): void;
    initializeProviders(): void;
}
//# sourceMappingURL=provider.factory.d.ts.map