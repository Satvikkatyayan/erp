import { IWorkerResult } from './IWorkerResult';

export interface IWorker<TJob> {
  execute(job: TJob): Promise<IWorkerResult>;
}
