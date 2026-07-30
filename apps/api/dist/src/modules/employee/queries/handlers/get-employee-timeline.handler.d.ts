import { GetEmployeeTimelineQuery } from '../get-employee-timeline.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';
export declare class GetEmployeeTimelineHandler {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    execute(query: GetEmployeeTimelineQuery): Promise<QueryResult<any[]>>;
}
//# sourceMappingURL=get-employee-timeline.handler.d.ts.map