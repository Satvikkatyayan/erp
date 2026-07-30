import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PayPayslipRepository } from '../repositories/payslip.repository';
import { PayslipAssembler, PayslipAssemblyContext } from './payslip-assembler.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { PayslipGeneratedEvent, PayslipVersionCreatedEvent, PayslipRegeneratedEvent } from '../domain/events/payroll.events';

@Injectable()
export class PayslipService {
    private readonly logger = new Logger(PayslipService.name);
    
    constructor(
        private readonly payslipRepo: PayPayslipRepository,
        private readonly assembler: PayslipAssembler,
        private readonly eventBus: EventBusService
    ) {}

    async generatePayslip(ctx: any, runId: string, employeeId: string, calculationId: string, snapshotId: string, tx: any): Promise<string> {
        this.logger.log(`Generating payslip for employee ${employeeId}`);
        
        const snapshot = await tx.payPayrollSnapshot.findUnique({ where: { id: snapshotId } });
        if (!snapshot) throw new BadRequestException('Snapshot not found');

        const calculation = await tx.payPayrollCalculation.findUnique({ where: { id: calculationId } });
        if (!calculation) throw new BadRequestException('Calculation not found');

        const calculationSteps = await tx.payCalculationStep.findMany({ 
            where: { calculationId },
            orderBy: { executionOrder: 'asc' }
        });

        // Parse snapshot data if needed, to pass employee/company info
        const snapData = typeof snapshot.snapshotData === 'string' 
            ? JSON.parse(snapshot.snapshotData) 
            : (snapshot.snapshotData || {});

        const assemblyCtx: PayslipAssemblyContext = {
            snapshot,
            calculation,
            calculationSteps,
            employeeData: snapData.salaryAssignment?.employee || {}, 
            companyData: snapData.company || {},
            salaryStructureVersion: 1
        };

        const latestVersion = await this.payslipRepo.getLatest(calculationId, ctx.tenantId);
        const previousVersionNumber = latestVersion ? latestVersion.versionNumber : 0;

        const payslipData = this.assembler.assemble(assemblyCtx, previousVersionNumber);

        const payslip = await this.payslipRepo.createVersion(calculationId, ctx.tenantId, payslipData, null, tx);

        if (previousVersionNumber === 0) {
            this.eventBus.publish(new PayslipGeneratedEvent(payslip.id, runId, employeeId));
        } else {
            this.eventBus.publish(new PayslipRegeneratedEvent(payslip.id, runId, employeeId, payslip.versionNumber));
        }
        this.eventBus.publish(new PayslipVersionCreatedEvent(payslip.id, runId, employeeId, payslip.versionNumber));

        return payslip.id;
    }
}
