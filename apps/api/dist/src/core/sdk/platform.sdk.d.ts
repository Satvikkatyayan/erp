import { SDKMiddlewarePipeline } from './middleware/sdk-pipeline';
import { PlatformContext } from '../contracts/context/platform-context';
import { PrismaService } from '../../common/prisma/prisma.service';
export declare class PlatformSDK {
    private readonly prisma;
    pipeline: SDKMiddlewarePipeline;
    private readonly logger;
    constructor(prisma: PrismaService);
    forms: {
        submit: (ctx: PlatformContext, payload: any) => Promise<any>;
    };
    workflow: {
        trigger: (ctx: PlatformContext, docId: string) => Promise<any>;
    };
    rules: {
        evaluate: (ctx: PlatformContext, policyName: string, inputs: any) => Promise<any>;
    };
    events: {
        publish: (ctx: PlatformContext, eventName: string, payload: any) => Promise<any>;
    };
    search: {
        index: (ctx: PlatformContext, indexName: string, docId: string, payload: any) => Promise<any>;
    };
    reporting: {
        registerDataset: (ctx: PlatformContext, datasetName: string, schema: any) => Promise<any>;
    };
    checkHealth(): {
        engine: string;
        version: string;
        status: string;
        capabilities: string[];
    };
}
//# sourceMappingURL=platform.sdk.d.ts.map