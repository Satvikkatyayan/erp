import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { EmployeeFacade } from '../facades/employee.facade';
export declare class EmployeeProfileService {
    private readonly facade;
    private readonly logger;
    constructor(facade: EmployeeFacade);
    getProfile(ctx: PlatformContext): Promise<{
        employeeId: string;
        employeeNumber: string;
        firstName: string;
        lastName: string;
        jobTitle: string;
    }>;
}
//# sourceMappingURL=employee-profile.service.d.ts.map