import { GetEmploymentStatusQuery } from '../get-employment-status.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmploymentStatusHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmploymentStatusQuery): Promise<QueryResult<string | null>>;
}
//# sourceMappingURL=get-employment-status.handler.d.ts.map