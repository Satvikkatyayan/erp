import { GetAssignmentHistoryQuery } from '../get-assignment-history.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetAssignmentHistoryHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetAssignmentHistoryQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-assignment-history.handler.d.ts.map