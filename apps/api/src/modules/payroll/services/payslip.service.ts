import { Injectable, Logger } from '@nestjs/common';
import { PayPayslipRepository } from '../repositories/payslip.repository';
import { createHash } from 'crypto';

@Injectable()
export class PayslipService {
    private readonly logger = new Logger(PayslipService.name);
    
    constructor(private readonly payslipRepo: PayPayslipRepository) {}

    async generatePayslip(ctx: any, runId: string, employeeId: string, calculationId: string, snapshotId: string, tx?: any): Promise<string> {
        this.logger.log(`Generating payslip for employee ${employeeId}`);
        
        // Ensure idempotency for Payslip
        // Usually, Payslip doesn't just get deleted if processed, but during calculation we reset it
        const client = tx || (this.payslipRepo as any).prisma; // Best effort access if needed, but we can't query by non-id without Prisma client directly unless we add it to repo.
        
        // For strict DDD, we should have a deleteByCalculationId on the repo, but for now we'll assume Prisma is available via tx.
        await tx.payPayslip.deleteMany({
            where: { calculationId }
        });

        const payslipData = { runId, employeeId, calculationId, snapshotId };
        const checksumSource = JSON.stringify(payslipData);
        const checksum = createHash('sha256').update(checksumSource).digest('hex');

        const payslip = await this.payslipRepo.save({
            tenantId: ctx.tenantId,
            calculationId,
            versionNumber: 1,
            status: 'Published', // Or 'DRAFT' depending on business rules
            checksum
        }, tx);

        return payslip.id;
    }
}
