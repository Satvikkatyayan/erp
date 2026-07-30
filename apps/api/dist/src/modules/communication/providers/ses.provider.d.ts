import { CommunicationProviderInterface } from '../contracts/communication-provider.interface';
import { RenderResult } from '../services/template-rendering.service';
export interface SesConfiguration {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}
export declare class SesProvider implements CommunicationProviderInterface {
    private readonly config;
    constructor(config: SesConfiguration);
    send(payload: RenderResult): Promise<void>;
}
//# sourceMappingURL=ses.provider.d.ts.map