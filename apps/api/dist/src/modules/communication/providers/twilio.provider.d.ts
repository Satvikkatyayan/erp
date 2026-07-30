import { CommunicationProviderInterface } from '../contracts/communication-provider.interface';
import { RenderResult } from '../services/template-rendering.service';
export interface TwilioConfiguration {
    accountSid: string;
    authToken: string;
    fromNumber: string;
}
export declare class TwilioProvider implements CommunicationProviderInterface {
    private readonly config;
    constructor(config: TwilioConfiguration);
    send(payload: RenderResult): Promise<void>;
}
//# sourceMappingURL=twilio.provider.d.ts.map