import { Injectable } from '@nestjs/common';
import { GetExitInformationQuery } from '../get-exit-information.query';
import { EmployeeQueryService } from '../../services/employee-query.service';
import { QueryResult } from '../../../../core/cqrs/query-result';

@Injectable()
export class GetExitInformationHandler {
  constructor(private readonly queryService: EmployeeQueryService) {}

  async execute(query: GetExitInformationQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.findExitInformation(query.tenantId, query.employeeId);
    return QueryResult.success(data);
  }
}
