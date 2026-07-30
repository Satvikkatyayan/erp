import { ApplyLeaveRequestDto, ApproveLeaveRequestDto, RejectLeaveRequestDto, CancelLeaveRequestDto } from '../api/dtos/requests.dto';
import { LeaveMapper } from '../api/mappers/leave.mapper';
import { ApplyLeaveHandler } from '../commands/handlers/apply-leave.handler';
import { ApproveLeaveHandler } from '../commands/handlers/approve-leave.handler';
import { RejectLeaveHandler } from '../commands/handlers/reject-leave.handler';
import { CancelLeaveHandler } from '../commands/handlers/cancel-leave.handler';
export declare class LeaveLifecycleController {
    private readonly mapper;
    private readonly applyLeaveHandler;
    private readonly approveLeaveHandler;
    private readonly rejectLeaveHandler;
    private readonly cancelLeaveHandler;
    constructor(mapper: LeaveMapper, applyLeaveHandler: ApplyLeaveHandler, approveLeaveHandler: ApproveLeaveHandler, rejectLeaveHandler: RejectLeaveHandler, cancelLeaveHandler: CancelLeaveHandler);
    applyLeave(tenantId: string, payload: ApplyLeaveRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    approveLeave(tenantId: string, id: string, payload: ApproveLeaveRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    rejectLeave(tenantId: string, id: string, payload: RejectLeaveRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    cancelLeave(tenantId: string, id: string, payload: CancelLeaveRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
}
//# sourceMappingURL=leave-lifecycle.controller.d.ts.map