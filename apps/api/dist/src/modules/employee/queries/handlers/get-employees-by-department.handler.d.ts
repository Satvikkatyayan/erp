import { GetEmployeesByDepartmentQuery } from '../get-employees-by-department.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeesByDepartmentHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeesByDepartmentQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-employees-by-department.handler.d.ts.map