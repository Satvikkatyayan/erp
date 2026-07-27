import { Readable } from 'stream';
export interface IStorageProvider {
    upload(bucket: string, key: string, stream: Readable | Buffer, mimeType: string): Promise<string>;
    download(bucket: string, key: string): Promise<Readable | Buffer>;
    delete(bucket: string, key: string): Promise<boolean>;
    generateSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string>;
    createMultipartUpload(bucket: string, key: string): Promise<string>;
    uploadPart(bucket: string, key: string, uploadId: string, partNumber: number, buffer: Buffer): Promise<string>;
    completeMultipartUpload(bucket: string, key: string, uploadId: string, parts: any[]): Promise<boolean>;
    abortMultipartUpload(bucket: string, key: string, uploadId: string): Promise<boolean>;
    listUploadedParts(bucket: string, key: string, uploadId: string): Promise<any[]>;
}
//# sourceMappingURL=storage-provider.interface.d.ts.map