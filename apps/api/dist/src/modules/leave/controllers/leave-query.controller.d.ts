import { PaginationDto, SortDto, LeaveFilterDto, SearchLeaveRequestsDto } from '../api/dtos/queries.dto';
import { LeaveMapper } from '../api/mappers/leave.mapper';
import { GetLeaveRequestHandler } from '../queries/handlers/get-leave-request.handler';
import { SearchLeaveRequestsHandler } from '../queries/handlers/search-leave-requests.handler';
import { GetLeaveBalancesHandler } from '../queries/handlers/get-leave-balances.handler';
export declare class LeaveQueryController {
    private readonly mapper;
    private readonly getLeaveRequestHandler;
    private readonly searchLeaveRequestsHandler;
    private readonly getLeaveBalancesHandler;
    constructor(mapper: LeaveMapper, getLeaveRequestHandler: GetLeaveRequestHandler, searchLeaveRequestsHandler: SearchLeaveRequestsHandler, getLeaveBalancesHandler: GetLeaveBalancesHandler);
    getLeaveRequest(tenantId: string, id: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    searchLeaveRequests(tenantId: string, pagination: PaginationDto, sort: SortDto, filters: LeaveFilterDto, searchParams: SearchLeaveRequestsDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    getLeaveBalances(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
}
//# sourceMappingURL=leave-query.controller.d.ts.map