import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessedEventStore {
  private processedEvents: Set<string> = new Set();

  async isProcessed(eventId: string, handlerId: string): Promise<boolean> {
    const key = `${eventId}:${handlerId}`;
    return this.processedEvents.has(key);
  }

  async markAsProcessed(eventId: string, handlerId: string): Promise<void> {
    const key = `${eventId}:${handlerId}`;
    this.processedEvents.add(key);
  }
}
