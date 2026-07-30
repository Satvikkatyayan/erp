import { GetLeaveRequestQuery } from '../get-leave-request.query';
import { QueryResult } from '../../../../core/cqrs/query-result';
import { LeaveQueryService } from '../../services/leave-query.service';
export declare class GetLeaveRequestHandler {
    private readonly queryService;
    constructor(queryService: LeaveQueryService);
    execute(query: GetLeaveRequestQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=get-leave-request.handler.d.ts.map