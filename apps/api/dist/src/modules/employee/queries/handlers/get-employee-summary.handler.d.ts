import { GetEmployeeSummaryQuery } from '../get-employee-summary.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeeSummaryHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeeSummaryQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=get-employee-summary.handler.d.ts.map