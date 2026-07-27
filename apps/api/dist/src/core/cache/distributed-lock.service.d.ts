import { ConfigService } from '@nestjs/config';
export declare class DistributedLockService {
    private configService;
    private redis;
    constructor(configService: ConfigService);
    acquire(key: string, ttlMs: number): Promise<boolean>;
    release(key: string): Promise<void>;
}
//# sourceMappingURL=distributed-lock.service.d.ts.map