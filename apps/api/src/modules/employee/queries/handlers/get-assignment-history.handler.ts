import { Injectable } from '@nestjs/common';
import { GetAssignmentHistoryQuery } from '../get-assignment-history.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetAssignmentHistoryHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetAssignmentHistoryQuery): Promise<QueryResult<any[]>> {
    const data = await this.queryService.findAssignmentHistory(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
