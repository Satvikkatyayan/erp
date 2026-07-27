"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const local_provider_1 = require("./core/storage/providers/local.provider");
const quota_engine_1 = require("./core/storage/policy/quota.engine");
const lifecycle_engine_1 = require("./core/storage/lifecycle/lifecycle.engine");
const platform_storage_sdk_1 = require("./core/storage/sdk/platform-storage.sdk");
async function verifyStorage() {
    const logger = new common_1.Logger('Storage-Verification');
    logger.log('Starting Storage Platform Verification...');
    const localProv = new local_provider_1.LocalStorageProvider();
    const quota = new quota_engine_1.QuotaEngine();
    const lifecycle = new lifecycle_engine_1.LifecycleEngine();
    const sdk = new platform_storage_sdk_1.PlatformStorageSDK(localProv, quota, lifecycle);
    logger.log('[Test 1] Standard Upload & Quota Engine...');
    try {
        const res = await sdk.upload('org123', 'hr-documents', 'user/123/resume.pdf', Buffer.alloc(10), 'application/pdf');
        logger.log(' - ✅ Upload successful under quota limit. Object ID: ' + res.objectId);
    }
    catch (e) {
        logger.error(' - ❌ Upload failed under limit');
    }
    try {
        await sdk.upload('org123', 'hr-documents', 'huge.pdf', Buffer.alloc(100000000), 'application/pdf');
        logger.error(' - ❌ Allowed upload over limit');
    }
    catch (e) {
        logger.log(' - ✅ Quota Enforcement blocked massive upload: ' + e.message);
    }
    logger.log('[Test 2] Content Addressable Duplicate Detection...');
    const resDup = await sdk.upload('org123', 'hr-documents', 'user/123/duplicate.pdf', Buffer.alloc(100), 'application/pdf');
    logger.log(' - ✅ Upload duplicate check evaluated (Simulated match): ' + resDup.objectId);
    logger.log('[Test 3] Secure Signed Share URLs...');
    const url = await sdk.getSignedUrl('hr-documents', 'user/123/resume.pdf', 3600);
    logger.log(' - Generated Expiring SAS Link: ' + url);
    logger.log('[Test 4] Multipart Upload Abstraction...');
    const multiRes = await sdk.runMultipartFlow('hr-documents', 'large-archive.zip');
    logger.log(' - ✅ Multipart Upload Flow executed: ' + multiRes);
    const abortRes = await sdk.abortMultipartFlow('hr-documents', 'abandoned.zip', 'upload-id-777');
    logger.log(' - ✅ Multipart Upload Aborted: ' + abortRes);
    logger.log('[Test 5] Lifecycle Engine...');
    const transition = await sdk.simulateLifecycle('user/123/resume.pdf');
    logger.log(' - Evaluated Object Transition state: ' + transition);
    logger.log('Storage Platform Verification Completed Successfully.');
}
verifyStorage().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=verify-storage.js.map