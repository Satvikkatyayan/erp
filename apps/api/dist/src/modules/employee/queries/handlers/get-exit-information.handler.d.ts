import { GetExitInformationQuery } from '../get-exit-information.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetExitInformationHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetExitInformationQuery): Promise<QueryResult<any>>;
}
//# sourceMappingURL=get-exit-information.handler.d.ts.map