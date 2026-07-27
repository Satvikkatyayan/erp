import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectionHealthService {
  async getLag(): Promise<number> {
    return 0;
  }

  async getFailedEventsCount(): Promise<number> {
    return 0;
  }

  async getReplayProgress(): Promise<number> {
    return 100;
  }

  async getStaleProjections(): Promise<string[]> {
    return [];
  }

  async getCacheAge(): Promise<number> {
    return 0;
  }

  async getProcessingThroughput(): Promise<number> {
    return 0;
  }

  async getAverageRebuildDuration(): Promise<number> {
    return 0;
  }

  async getQueueDepth(): Promise<number> {
    return 0;
  }
}
