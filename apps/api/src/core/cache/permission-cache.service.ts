import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionCacheService {
  // Mocking Redis connection for scaffolding
  private cache = new Map<string, string[]>();

  async getUserPermissions(userId: string): Promise<string[]> {
    return this.cache.get(userId) || [];
  }

  async setUserPermissions(userId: string, permissions: string[]): Promise<void> {
    this.cache.set(userId, permissions);
  }

  async invalidate(userId: string): Promise<void> {
    this.cache.delete(userId);
  }
}