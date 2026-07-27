export interface ISecurityEventLogger {
    logEvent(userId: string | null, eventType: string, details?: any, ipAddress?: string, userAgent?: string): Promise<void>;
}
//# sourceMappingURL=security-event-logger.interface.d.ts.map