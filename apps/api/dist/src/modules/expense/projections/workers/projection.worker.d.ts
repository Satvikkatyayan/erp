import { IWorker } from '../../../../core/execution/interfaces/IWorker';
import { IWorkerResult } from '../../../../core/execution/interfaces/IWorkerResult';
import { ProjectionRegistry } from '../registry/projection.registry';
export declare class ProjectionWorker<TEvent> implements IWorker<TEvent> {
    private readonly registry;
    constructor(registry: ProjectionRegistry<TEvent>);
    execute(job: TEvent): Promise<IWorkerResult>;
}
//# sourceMappingURL=projection.worker.d.ts.map