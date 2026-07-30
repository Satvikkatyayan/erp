import { Injectable } from '@nestjs/common';
import { GetEmployeeSummaryQuery } from '../get-employee-summary.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmployeeSummaryHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmployeeSummaryQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.findEmployeeSummary(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
