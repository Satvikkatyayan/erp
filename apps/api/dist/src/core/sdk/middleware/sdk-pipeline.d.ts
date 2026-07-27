import { PlatformContext } from '../../contracts/context/platform-context';
export declare class SDKMiddlewarePipeline {
    private readonly logger;
    execute<T>(context: PlatformContext, targetEngine: string, operationName: string, handler: () => Promise<T>): Promise<any>;
}
//# sourceMappingURL=sdk-pipeline.d.ts.map