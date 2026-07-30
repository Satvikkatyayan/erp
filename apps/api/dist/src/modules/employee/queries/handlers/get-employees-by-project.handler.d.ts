import { GetEmployeesByProjectQuery } from '../get-employees-by-project.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeesByProjectHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeesByProjectQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-employees-by-project.handler.d.ts.map