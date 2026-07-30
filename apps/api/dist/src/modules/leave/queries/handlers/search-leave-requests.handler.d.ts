import { SearchLeaveRequestsQuery } from '../search-leave-requests.query';
import { QueryResult } from '../../../../core/cqrs/query-result';
import { LeaveQueryService } from '../../services/leave-query.service';
export declare class SearchLeaveRequestsHandler {
    private readonly queryService;
    constructor(queryService: LeaveQueryService);
    execute(query: SearchLeaveRequestsQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=search-leave-requests.handler.d.ts.map