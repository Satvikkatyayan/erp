import { OnModuleInit } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class RecruitmentBootstrapService implements OnModuleInit {
    private readonly sdk;
    private readonly logger;
    constructor(sdk: PlatformSDK);
    onModuleInit(): Promise<void>;
}
//# sourceMappingURL=recruitment-bootstrap.service.d.ts.map