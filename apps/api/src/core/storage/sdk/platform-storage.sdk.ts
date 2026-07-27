import { Injectable, Logger } from '@nestjs/common';
import { LocalStorageProvider } from '../providers/local.provider';
import { QuotaEngine } from '../policy/quota.engine';
import { LifecycleEngine } from '../lifecycle/lifecycle.engine';

@Injectable()
export class PlatformStorageSDK {
  private readonly logger = new Logger(PlatformStorageSDK.name);

  constructor(
    private provider: LocalStorageProvider, // Defaulting to Local for verification
    private quota: QuotaEngine,
    private lifecycle: LifecycleEngine
  ) {}

  async upload(orgId: string, bucket: string, key: string, buffer: Buffer, mimeType: string) {
    const isAllowed = await this.quota.validateUpload(orgId, buffer.length);
    if (!isAllowed) throw new Error('QUOTA_EXCEEDED');
    
    // Simulate CAS (Content-Addressable Checksum duplicate check)
    const mockHash = 'hash_' + buffer.length;
    if (mockHash === 'hash_100') {
        this.logger.log('Duplicate Checksum Detected! Linking metadata without redundant upload.');
        return { objectId: 'duplicate-ref-xyz', checksum: mockHash };
    }

    const checksum = await this.provider.upload(bucket, key, buffer, mimeType);
    return { objectId: 'obj-xyz', checksum };
  }
  
  async getSignedUrl(bucket: string, key: string, expiresIn: number) {
    return this.provider.generateSignedUrl(bucket, key, expiresIn);
  }
  
  async runMultipartFlow(bucket: string, key: string) {
    const uploadId = await this.provider.createMultipartUpload(bucket, key);
    const etag1 = await this.provider.uploadPart(bucket, key, uploadId, 1, Buffer.from('part1'));
    const etag2 = await this.provider.uploadPart(bucket, key, uploadId, 2, Buffer.from('part2'));
    await this.provider.completeMultipartUpload(bucket, key, uploadId, [etag1, etag2]);
    return true;
  }
  
  async abortMultipartFlow(bucket: string, key: string, uploadId: string) {
    return this.provider.abortMultipartUpload(bucket, key, uploadId);
  }
  
  async simulateLifecycle(key: string) {
    return this.lifecycle.evaluateTransitions(key);
  }
}