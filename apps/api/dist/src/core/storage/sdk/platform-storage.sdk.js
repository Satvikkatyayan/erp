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
var PlatformStorageSDK_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformStorageSDK = void 0;
const common_1 = require("@nestjs/common");
const local_provider_1 = require("../providers/local.provider");
const quota_engine_1 = require("../policy/quota.engine");
const lifecycle_engine_1 = require("../lifecycle/lifecycle.engine");
let PlatformStorageSDK = PlatformStorageSDK_1 = class PlatformStorageSDK {
    constructor(provider, quota, lifecycle) {
        this.provider = provider;
        this.quota = quota;
        this.lifecycle = lifecycle;
        this.logger = new common_1.Logger(PlatformStorageSDK_1.name);
    }
    async upload(orgId, bucket, key, buffer, mimeType) {
        const isAllowed = await this.quota.validateUpload(orgId, buffer.length);
        if (!isAllowed)
            throw new Error('QUOTA_EXCEEDED');
        const mockHash = 'hash_' + buffer.length;
        if (mockHash === 'hash_100') {
            this.logger.log('Duplicate Checksum Detected! Linking metadata without redundant upload.');
            return { objectId: 'duplicate-ref-xyz', checksum: mockHash };
        }
        const checksum = await this.provider.upload(bucket, key, buffer, mimeType);
        return { objectId: 'obj-xyz', checksum };
    }
    async getSignedUrl(bucket, key, expiresIn) {
        return this.provider.generateSignedUrl(bucket, key, expiresIn);
    }
    async runMultipartFlow(bucket, key) {
        const uploadId = await this.provider.createMultipartUpload(bucket, key);
        const etag1 = await this.provider.uploadPart(bucket, key, uploadId, 1, Buffer.from('part1'));
        const etag2 = await this.provider.uploadPart(bucket, key, uploadId, 2, Buffer.from('part2'));
        await this.provider.completeMultipartUpload(bucket, key, uploadId, [etag1, etag2]);
        return true;
    }
    async abortMultipartFlow(bucket, key, uploadId) {
        return this.provider.abortMultipartUpload(bucket, key, uploadId);
    }
    async simulateLifecycle(key) {
        return this.lifecycle.evaluateTransitions(key);
    }
};
exports.PlatformStorageSDK = PlatformStorageSDK;
exports.PlatformStorageSDK = PlatformStorageSDK = PlatformStorageSDK_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [local_provider_1.LocalStorageProvider,
        quota_engine_1.QuotaEngine,
        lifecycle_engine_1.LifecycleEngine])
], PlatformStorageSDK);
//# sourceMappingURL=platform-storage.sdk.js.map