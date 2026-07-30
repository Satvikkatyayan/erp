import { GetLeaveBalancesQuery } from '../get-leave-balances.query';
import { QueryResult } from '../../../../core/cqrs/query-result';
import { LeaveQueryService } from '../../services/leave-query.service';
export declare class GetLeaveBalancesHandler {
    private readonly queryService;
    constructor(queryService: LeaveQueryService);
    execute(query: GetLeaveBalancesQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=get-leave-balances.handler.d.ts.map