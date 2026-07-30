import { Injectable } from '@nestjs/common';
import { GetEmployeeTimelineQuery } from '../get-employee-timeline.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeeTimelineHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeeTimelineQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findTimeline(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
