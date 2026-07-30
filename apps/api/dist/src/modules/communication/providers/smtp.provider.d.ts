import { CommunicationProviderInterface } from '../contracts/communication-provider.interface';
import { RenderResult } from '../services/template-rendering.service';
export interface SmtpConfiguration {
    host: string;
    port: number;
    secure: boolean;
    authUser: string;
    authPass: string;
}
export declare class SmtpProvider implements CommunicationProviderInterface {
    private readonly config;
    constructor(config: SmtpConfiguration);
    send(payload: RenderResult): Promise<void>;
}
//# sourceMappingURL=smtp.provider.d.ts.map