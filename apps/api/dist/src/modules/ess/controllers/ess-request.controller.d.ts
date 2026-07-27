import { EmployeeRequestService } from '../services/employee-request.service';
export declare class EssRequestController {
    private readonly requestService;
    constructor(requestService: EmployeeRequestService);
    submitLeave(req: any, payload: any): Promise<any>;
    submitExpense(req: any, payload: any): Promise<any>;
}
//# sourceMappingURL=ess-request.controller.d.ts.map