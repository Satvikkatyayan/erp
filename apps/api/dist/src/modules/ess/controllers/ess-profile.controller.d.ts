import { EmployeeProfileService } from '../services/employee-profile.service';
export declare class EssProfileController {
    private readonly profileService;
    constructor(profileService: EmployeeProfileService);
    getProfile(req: any): Promise<{
        employeeId: string;
        employeeNumber: string;
        firstName: string;
        lastName: string;
        jobTitle: string;
    }>;
}
//# sourceMappingURL=ess-profile.controller.d.ts.map