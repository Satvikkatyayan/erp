export interface PlatformContext {
  correlationId: string;
  tenantId?: string;
  organizationId?: string;
  userId?: string;
  employeeId?: string;
  locale: string;
  timezone: string;
  requestId: string;
  traceId: string;
  featureFlags: Record<string, boolean>;
  roles?: string[];
}