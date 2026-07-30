import { SearchEmployeesQuery } from '../search-employees.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class SearchEmployeesHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: SearchEmployeesQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=search-employees.handler.d.ts.map