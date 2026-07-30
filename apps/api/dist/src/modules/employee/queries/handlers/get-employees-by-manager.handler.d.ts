import { GetEmployeesByManagerQuery } from '../get-employees-by-manager.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeesByManagerHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeesByManagerQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-employees-by-manager.handler.d.ts.map