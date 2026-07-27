import { AbstractRegistry } from './abstract.registry';
import { IWorker } from '../execution/interfaces/IWorker';
export declare class WorkerRegistry extends AbstractRegistry<IWorker<any>> {
    protected supportsMultipleItemsPerKey(): boolean;
    execute(jobType: string, jobData: any): Promise<any>;
}
//# sourceMappingURL=worker.registry.d.ts.map