import { GetEmployeesByOrganizationQuery } from '../get-employees-by-organization.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeesByOrganizationHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeesByOrganizationQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-employees-by-organization.handler.d.ts.map