import { Injectable } from '@nestjs/common';
import { AbstractRegistry } from './abstract.registry';
import { IWorker } from '../execution/interfaces/IWorker';

@Injectable()
export class WorkerRegistry extends AbstractRegistry<IWorker<any>> {
  protected supportsMultipleItemsPerKey(): boolean {
    return false; // Only one worker per job type
  }

  execute(jobType: string, jobData: any): Promise<any> {
    const worker = this.get(jobType);
    if (!worker) throw new Error(`No worker registered for ${jobType}`);
    return worker.execute(jobData);
  }
}
