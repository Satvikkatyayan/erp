import { Module } from '@nestjs/common';
import { LocalStorageProvider } from './providers/local.provider';
import { S3StorageProvider } from './providers/s3.provider';
import { QuotaEngine } from './policy/quota.engine';
import { LifecycleEngine } from './lifecycle/lifecycle.engine';
import { PlatformStorageSDK } from './sdk/platform-storage.sdk';

@Module({
  providers: [
    LocalStorageProvider,
    S3StorageProvider,
    QuotaEngine,
    LifecycleEngine,
    PlatformStorageSDK
  ],
  exports: [PlatformStorageSDK]
})
export class StorageModule {}
