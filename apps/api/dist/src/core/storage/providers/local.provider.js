"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LocalStorageProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageProvider = void 0;
const common_1 = require("@nestjs/common");
let LocalStorageProvider = LocalStorageProvider_1 = class LocalStorageProvider {
    constructor() {
        this.logger = new common_1.Logger(LocalStorageProvider_1.name);
    }
    async upload(bucket, key, stream, mimeType) {
        this.logger.debug(`[Mock] Uploading to ${bucket}/${key}`);
        return 'local-checksum-abc123mock';
    }
    async download(bucket, key) {
        return Buffer.from('Mock content');
    }
    async delete(bucket, key) { return true; }
    async generateSignedUrl(bucket, key, expiresIn) {
        return `http://localhost:3000/api/storage/${bucket}/${key}?signature=MOCK_EXPIRES_${expiresIn}`;
    }
    async createMultipartUpload(bucket, key) {
        return 'mock-upload-id-999';
    }
    async uploadPart(bucket, key, uploadId, partNumber, buffer) {
        return `ETag-${partNumber}`;
    }
    async completeMultipartUpload(bucket, key, uploadId, parts) {
        this.logger.debug(`[Mock] Completed multipart upload ${uploadId} with ${parts.length} parts`);
        return true;
    }
    async abortMultipartUpload(bucket, key, uploadId) {
        this.logger.debug(`[Mock] Aborted multipart upload ${uploadId}`);
        return true;
    }
    async listUploadedParts(bucket, key, uploadId) {
        return [];
    }
};
exports.LocalStorageProvider = LocalStorageProvider;
exports.LocalStorageProvider = LocalStorageProvider = LocalStorageProvider_1 = __decorate([
    (0, common_1.Injectable)()
], LocalStorageProvider);
//# sourceMappingURL=local.provider.js.map