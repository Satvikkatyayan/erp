import { Injectable } from '@nestjs/common';
import { IWorker } from '../../../../core/execution/interfaces/IWorker';
import { IWorkerResult } from '../../../../core/execution/interfaces/IWorkerResult';
import { ProjectionRegistry } from '../registry/projection.registry';

@Injectable()
export class ProjectionWorker<TEvent> implements IWorker<TEvent> {
  constructor(private readonly registry: ProjectionRegistry<TEvent>) {}

  async execute(job: TEvent): Promise<IWorkerResult> {
    await this.registry.dispatch(job);
    return { success: true };
  }
}
