import { Injectable } from '@nestjs/common';
import { SearchLeaveRequestsQuery } from '../search-leave-requests.query';
import { QueryResult } from '../../../../core/cqrs/query-result';
import { LeaveQueryService } from '../../services/leave-query.service';

@Injectable()
export class SearchLeaveRequestsHandler {
  constructor(private readonly queryService: LeaveQueryService) {}

  async execute(query: SearchLeaveRequestsQuery): Promise<QueryResult<any>> {
    const data = await this.queryService.searchLeaveRequests(query.tenantId, query.filters, query.sort);
    return QueryResult.success(data);
  }
}
