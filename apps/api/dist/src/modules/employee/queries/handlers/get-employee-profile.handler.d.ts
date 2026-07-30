import { GetEmployeeProfileQuery } from '../get-employee-profile.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeeProfileHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeeProfileQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=get-employee-profile.handler.d.ts.map