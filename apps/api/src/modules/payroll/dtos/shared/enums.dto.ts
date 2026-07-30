export enum ApiPayrollRunStatusEnum {
  DRAFT = 'Draft',
  COLLECTING = 'Collecting',
  CALCULATING = 'Calculating',
  APPROVED = 'Approved',
  LOCKED = 'Locked',
  PROCESSED = 'Processed',
  CANCELLED = 'Cancelled',
  ARCHIVED = 'Archived'
}

export enum ApiPayrollReviewStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED'
}