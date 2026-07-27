import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { EmployeeBootstrapService } from './employee-bootstrap.service';
import { EmployeeValidationService } from './employee-validation.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class EmployeeLifecycleService {
    private readonly prisma;
    private readonly sdk;
    private readonly bootstrap;
    private readonly validator;
    constructor(prisma: PrismaService, sdk: PlatformSDK, bootstrap: EmployeeBootstrapService, validator: EmployeeValidationService);
    onboardEmployee(ctx: PlatformContext, payload: any): Promise<{
        id: string;
        userId: string | null;
        tenantId: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        employeeNumber: string;
    }>;
    updateEmployee(ctx: PlatformContext, employeeId: string, payload: any): Promise<void>;
    transferEmployee(ctx: PlatformContext, employeeId: string, payload: any): Promise<void>;
    promoteEmployee(ctx: PlatformContext, employeeId: string, payload: any): Promise<void>;
    confirmEmployee(ctx: PlatformContext, employeeId: string): Promise<void>;
    suspendEmployee(ctx: PlatformContext, employeeId: string): Promise<void>;
    terminateEmployee(ctx: PlatformContext, employeeId: string): Promise<void>;
    assignManager(ctx: PlatformContext, employeeId: string, managerId: string): Promise<void>;
    markDocumentExpired(ctx: PlatformContext, employeeId: string, documentId: string): Promise<void>;
    completeProbation(ctx: PlatformContext, employeeId: string): Promise<void>;
}
//# sourceMappingURL=employee-lifecycle.service.d.ts.map