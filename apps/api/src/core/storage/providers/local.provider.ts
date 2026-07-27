import { Injectable, Logger } from '@nestjs/common';
import { IStorageProvider } from './storage-provider.interface';
import { Readable } from 'stream';

@Injectable()
export class LocalStorageProvider implements IStorageProvider {
  private readonly logger = new Logger(LocalStorageProvider.name);

  async upload(bucket: string, key: string, stream: Readable | Buffer, mimeType: string): Promise<string> {
    this.logger.debug(`[Mock] Uploading to ${bucket}/${key}`);
    return 'local-checksum-abc123mock'; // Mock checksum
  }
  
  async download(bucket: string, key: string): Promise<Readable | Buffer> {
    return Buffer.from('Mock content');
  }

  async delete(bucket: string, key: string): Promise<boolean> { return true; }
  
  async generateSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string> {
    return `http://localhost:3000/api/storage/${bucket}/${key}?signature=MOCK_EXPIRES_${expiresIn}`;
  }

  async createMultipartUpload(bucket: string, key: string): Promise<string> {
    return 'mock-upload-id-999';
  }
  
  async uploadPart(bucket: string, key: string, uploadId: string, partNumber: number, buffer: Buffer): Promise<string> {
    return `ETag-${partNumber}`;
  }
  
  async completeMultipartUpload(bucket: string, key: string, uploadId: string, parts: any[]): Promise<boolean> {
    this.logger.debug(`[Mock] Completed multipart upload ${uploadId} with ${parts.length} parts`);
    return true;
  }
  
  async abortMultipartUpload(bucket: string, key: string, uploadId: string): Promise<boolean> {
    this.logger.debug(`[Mock] Aborted multipart upload ${uploadId}`);
    return true;
  }
  
  async listUploadedParts(bucket: string, key: string, uploadId: string): Promise<any[]> {
    return [];
  }
}