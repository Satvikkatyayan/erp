import { GetCurrentAssignmentQuery } from '../get-current-assignment.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetCurrentAssignmentHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetCurrentAssignmentQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=get-current-assignment.handler.d.ts.map