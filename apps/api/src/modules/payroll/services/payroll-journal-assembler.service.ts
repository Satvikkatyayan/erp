import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

export interface JournalAssemblyContext {
  payrollRunId: string;
  calculations: any[];
  calculationSteps: any[];
  payslips: any[];
  salaryComponents: any[];
}

@Injectable()
export class PayrollJournalAssembler {
  
  public assembleEntries(ctx: JournalAssemblyContext): any[] {
    const { payrollRunId, calculations, calculationSteps, payslips, salaryComponents } = ctx;
    const entries: any[] = [];
    
    // Map components for quick lookup
    const componentMap = new Map();
    salaryComponents.forEach(c => componentMap.set(c.id, c));

    // Map payslips to employees
    const payslipMap = new Map();
    payslips.forEach(p => payslipMap.set(p.calculation.employeeId, p));

    for (const calc of calculations) {
      const steps = calculationSteps.filter(s => s.calculationId === calc.id);
      const payslip = payslipMap.get(calc.employeeId);
      if (!payslip) continue;

      for (const step of steps) {
        const component = componentMap.get(step.componentId);
        if (!component) continue;
        
        // This is a pure assembly based on configuration.
        // A full implementation would map Salary Components to precise Account Codes.
        // Using generic mapping for architecture stub.
        const accountCode = `ACC-${component.type.toUpperCase()}`;
        const accountName = `${component.name} Account`;
        
        // Ensure values are consistently signed based on component type
        const isEarning = component.type === 'Earning';
        const debit = isEarning ? step.calculatedValue : 0;
        const credit = !isEarning ? Math.abs(step.calculatedValue) : 0;

        if (debit === 0 && credit === 0) continue;

        const checksumInput = JSON.stringify({
          employeeId: calc.employeeId,
          payrollRunId,
          calculationId: calc.id,
          payslipId: payslip.id,
          accountCode,
          debit,
          credit
        });
        const checksum = crypto.createHash('sha256').update(checksumInput).digest('hex');

        entries.push({
          id: uuidv4(),
          employeeId: calc.employeeId,
          payrollRunId,
          calculationId: calc.id,
          payslipId: payslip.id,
          accountCode,
          accountName,
          debit,
          credit,
          currency: calc.currencyId || 'INR',
          description: `Payroll Entry for ${component.name}`,
          entryType: component.type,
          versionNumber: 1,
          checksum,
        });
      }
    }
    
    return entries;
  }
}
