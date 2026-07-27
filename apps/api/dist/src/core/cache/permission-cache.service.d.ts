export declare class PermissionCacheService {
    private cache;
    getUserPermissions(userId: string): Promise<string[]>;
    setUserPermissions(userId: string, permissions: string[]): Promise<void>;
    invalidate(userId: string): Promise<void>;
}
//# sourceMappingURL=permission-cache.service.d.ts.map