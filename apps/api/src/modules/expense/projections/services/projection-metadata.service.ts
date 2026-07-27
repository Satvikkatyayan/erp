import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectionMetadataService {
  async getProjectionVersion(projectionId: string): Promise<number> {
    return 0;
  }

  async getReplayTimestamp(projectionId: string): Promise<Date | null> {
    return null;
  }

  async getRebuildStatus(projectionId: string): Promise<string> {
    return 'IDLE';
  }

  async getLastProcessedEvent(projectionId: string): Promise<string | null> {
    return null;
  }

  async getProjectionStatistics(projectionId: string): Promise<any> {
    return {};
  }
}
