import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectionReplayEngine {
  async rebuildProjections(): Promise<void> {}

  async rebuildProjection(projectionName: string): Promise<void> {}

  async replayEvents(): Promise<void> {}

  async replayFromEvent(eventId: string): Promise<void> {}

  async replayRange(start: string, end: string): Promise<void> {}

  async rebuildEmployee(employeeId: string): Promise<void> {}

  async rebuildDepartment(departmentId: string): Promise<void> {}

  async rebuildEverything(): Promise<void> {}
}
