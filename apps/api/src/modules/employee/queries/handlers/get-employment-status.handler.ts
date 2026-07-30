import { Injectable } from '@nestjs/common';
import { GetEmploymentStatusQuery } from '../get-employment-status.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetEmploymentStatusHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetEmploymentStatusQuery): Promise<QueryResult<string | null>> {
    const data = await this.queryService.findEmploymentStatus(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
