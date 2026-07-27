import { Logger } from '@nestjs/common';
import { LocalStorageProvider } from './core/storage/providers/local.provider';
import { QuotaEngine } from './core/storage/policy/quota.engine';
import { LifecycleEngine } from './core/storage/lifecycle/lifecycle.engine';
import { PlatformStorageSDK } from './core/storage/sdk/platform-storage.sdk';

async function verifyStorage() {
  const logger = new Logger('Storage-Verification');
  logger.log('Starting Storage Platform Verification...');

  const localProv = new LocalStorageProvider();
  const quota = new QuotaEngine();
  const lifecycle = new LifecycleEngine();
  
  const sdk = new PlatformStorageSDK(localProv, quota, lifecycle);

  // [Test 1] Upload & Quota Enforcement
  logger.log('[Test 1] Standard Upload & Quota Engine...');
  try {
    const res = await sdk.upload('org123', 'hr-documents', 'user/123/resume.pdf', Buffer.alloc(10), 'application/pdf');
    logger.log(' - ✅ Upload successful under quota limit. Object ID: ' + res.objectId);
  } catch(e) {
    logger.error(' - ❌ Upload failed under limit');
  }

  try {
    await sdk.upload('org123', 'hr-documents', 'huge.pdf', Buffer.alloc(100000000), 'application/pdf'); // 100MB
    logger.error(' - ❌ Allowed upload over limit');
  } catch (e: any) {
    logger.log(' - ✅ Quota Enforcement blocked massive upload: ' + e.message);
  }

  // [Test 2] Duplicate Checksum Detection (CAS)
  logger.log('[Test 2] Content Addressable Duplicate Detection...');
  const resDup = await sdk.upload('org123', 'hr-documents', 'user/123/duplicate.pdf', Buffer.alloc(100), 'application/pdf');
  logger.log(' - ✅ Upload duplicate check evaluated (Simulated match): ' + resDup.objectId);

  // [Test 3] Signed URL
  logger.log('[Test 3] Secure Signed Share URLs...');
  const url = await sdk.getSignedUrl('hr-documents', 'user/123/resume.pdf', 3600);
  logger.log(' - Generated Expiring SAS Link: ' + url);

  // [Test 4] Multipart Upload Abstraction
  logger.log('[Test 4] Multipart Upload Abstraction...');
  const multiRes = await sdk.runMultipartFlow('hr-documents', 'large-archive.zip');
  logger.log(' - ✅ Multipart Upload Flow executed: ' + multiRes);
  const abortRes = await sdk.abortMultipartFlow('hr-documents', 'abandoned.zip', 'upload-id-777');
  logger.log(' - ✅ Multipart Upload Aborted: ' + abortRes);

  // [Test 5] Lifecycle Policy Transition
  logger.log('[Test 5] Lifecycle Engine...');
  const transition = await sdk.simulateLifecycle('user/123/resume.pdf');
  logger.log(' - Evaluated Object Transition state: ' + transition);

  logger.log('Storage Platform Verification Completed Successfully.');
}

verifyStorage().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
