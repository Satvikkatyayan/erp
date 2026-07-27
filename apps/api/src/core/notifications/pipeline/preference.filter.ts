import { Injectable } from '@nestjs/common';

@Injectable()
export class PreferenceFilter {
  shouldSuppress(channel: string, priority: string, userPreferences: any): boolean {
    if (priority === 'CRITICAL') return false; // Never suppress critical
    if (userPreferences?.mutedChannels?.includes(channel)) return true;
    
    // Quiet hours check mock
    const isQuietHours = userPreferences?.inQuietHours === true;
    if (isQuietHours) return true;
    
    return false;
  }
}