import { ClearanceMatrixEngine } from './clearance-matrix.engine';
import { ExitPolicyResolver } from '../resolvers/exit-policy.resolver';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class ExitOperationEngine {
    private readonly matrixEngine;
    private readonly policyResolver;
    private readonly logger;
    constructor(matrixEngine: ClearanceMatrixEngine, policyResolver: ExitPolicyResolver);
    processStateTransition(ctx: PlatformContext, requestId: string, newState: string): Promise<void>;
}
//# sourceMappingURL=exit-operation.engine.d.ts.map