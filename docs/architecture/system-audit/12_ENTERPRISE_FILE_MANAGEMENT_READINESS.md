# 12 ENTERPRISE FILE MANAGEMENT READINESS

## 1. Purpose
A unified platform service for storing, retrieving, and securing binary assets (PDFs, Images, Documents) while completely abstracting the underlying infrastructure (AWS S3, Azure Blob, etc.).

## 2. Ownership
- **Owns**: File asset metadata (filename, mime type, size, bucket path), Document Access Logs (audit trails of who downloaded what).
- **Does Not Own**: Business logic associating a file with a specific entity (e.g., it does not track that File A belongs to Leave Request B). It only issues a generic `fileId`.

## 3. Storage Abstraction
Business modules will store a generic `file_id` (UUID) string in their respective tables (e.g., `leave_requests.attachment_file_id`). They will never store S3 URLs or physical paths.

## 4. Module Consumers
- **Recruitment**: Resumes, cover letters.
- **Leave**: Medical certificates, proof of absence.
- **Employee**: Identification documents, signed contracts.

## 5. Security & Versioning
- File streams are never passed through HTTP directly if avoidable. The service generates temporary, pre-signed URLs for client-side download/upload.
- File overwrites are forbidden. Uploading a new version generates a new `fileId`, preserving historical integrity (crucial for Dual Audit requirements).

## 6. Required SDK
`PlatformFileManagementSDK`
- `generateUploadUrl(metadata: FileMetadataDto): Promise<PresignedUrlDto>`
- `generateDownloadUrl(fileId: string, expirySeconds: number): Promise<PresignedUrlDto>`
- `verifyAsset(fileId: string): Promise<boolean>`

## 7. Future Scalability
By completely isolating the File Management service behind an SDK, we guarantee that if the enterprise decides to migrate from AWS S3 to Google Cloud Storage in the future, exactly one module requires updating, and zero business logic is impacted.
