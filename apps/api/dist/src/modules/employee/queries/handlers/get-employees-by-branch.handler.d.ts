import { GetEmployeesByBranchQuery } from '../get-employees-by-branch.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeesByBranchHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeesByBranchQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-employees-by-branch.handler.d.ts.map