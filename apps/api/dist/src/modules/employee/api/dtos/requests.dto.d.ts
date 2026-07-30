export declare class AssignmentDataDto {
    departmentId: string;
    roleId: string;
    managerId?: string;
}
export declare class OnboardingDataDto {
    firstName: string;
    lastName: string;
    email: string;
}
export declare class OnboardEmployeeRequestDto {
    data: OnboardingDataDto;
}
export declare class JoinEmployeeRequestDto {
}
export declare class TransferEmployeeRequestDto {
    newAssignmentData: AssignmentDataDto;
}
export declare class PromoteEmployeeRequestDto {
    newAssignmentData: AssignmentDataDto;
}
export declare class ResignEmployeeRequestDto {
    resignationDate: string;
}
export declare class TerminateEmployeeRequestDto {
    terminationDate: string;
}
export declare class ExitEmployeeRequestDto {
    exitDate: string;
}
export declare class RehireEmployeeRequestDto {
    initialAssignmentData: AssignmentDataDto;
}
export declare class ConfirmEmployeeRequestDto {
    confirmedBy: string;
    confirmedAt: string;
}
//# sourceMappingURL=requests.dto.d.ts.map