import { LocalStorageProvider } from '../providers/local.provider';
import { QuotaEngine } from '../policy/quota.engine';
import { LifecycleEngine } from '../lifecycle/lifecycle.engine';
export declare class PlatformStorageSDK {
    private provider;
    private quota;
    private lifecycle;
    private readonly logger;
    constructor(provider: LocalStorageProvider, quota: QuotaEngine, lifecycle: LifecycleEngine);
    upload(orgId: string, bucket: string, key: string, buffer: Buffer, mimeType: string): Promise<{
        objectId: string;
        checksum: string;
    }>;
    getSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string>;
    runMultipartFlow(bucket: string, key: string): Promise<boolean>;
    abortMultipartFlow(bucket: string, key: string, uploadId: string): Promise<boolean>;
    simulateLifecycle(key: string): Promise<string>;
}
//# sourceMappingURL=platform-storage.sdk.d.ts.map