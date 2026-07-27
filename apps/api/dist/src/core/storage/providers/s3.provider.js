"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var S3StorageProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
let S3StorageProvider = S3StorageProvider_1 = class S3StorageProvider {
    constructor() {
        this.logger = new common_1.Logger(S3StorageProvider_1.name);
        this.client = new client_s3_1.S3Client({ region: 'us-east-1' });
    }
    async upload(bucket, key, stream, mimeType) {
        this.logger.debug(`[S3] Uploading to ${bucket}/${key}`);
        return 's3-checksum-mock';
    }
    async download(bucket, key) { return Buffer.from(''); }
    async delete(bucket, key) { return true; }
    async generateSignedUrl(bucket, key, expiresIn) { return 'https://mock.s3.amazonaws.com/xyz?sig=...'; }
    async createMultipartUpload(bucket, key) { return 'mock-s3-up-id'; }
    async uploadPart(bucket, key, uploadId, partNumber, buffer) { return 'etag'; }
    async completeMultipartUpload(bucket, key, uploadId, parts) { return true; }
    async abortMultipartUpload(bucket, key, uploadId) { return true; }
    async listUploadedParts(bucket, key, uploadId) { return []; }
};
exports.S3StorageProvider = S3StorageProvider;
exports.S3StorageProvider = S3StorageProvider = S3StorageProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3StorageProvider);
//# sourceMappingURL=s3.provider.js.map