import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export interface PayslipAssemblyContext {
  snapshot: any;
  calculation: any;
  calculationSteps: any[];
  employeeData: any;
  companyData: any;
  salaryStructureVersion: number;
  reviewMetadata?: any;
}

@Injectable()
export class PayslipAssembler {
  
  public assemble(ctx: PayslipAssemblyContext, previousVersion: number = 0): any {
    const { 
      snapshot, 
      calculation, 
      calculationSteps, 
      employeeData, 
      companyData,
      salaryStructureVersion,
      reviewMetadata 
    } = ctx;

    const snapshotData = typeof snapshot.snapshotData === 'string' 
      ? JSON.parse(snapshot.snapshotData) 
      : snapshot.snapshotData || {};

    const attendanceSummary = snapshotData.attendanceSummary || {
      daysPresent: 0,
      daysAbsent: 0,
      paidLeave: 0,
      unpaidLeave: 0,
      halfDays: 0,
      lateDays: 0,
      overtimeHours: 0,
      attendancePercentage: 0,
      projectAllocationSummary: {},
      siteAllocationSummary: {}
    };

    const earnings: any[] = [];
    const deductions: any[] = [];
    const employerContributions: any[] = [];

    // Parse steps based on execution order and component names
    calculationSteps.forEach(step => {
      // In a real assembly, the component type (EARNING, DEDUCTION, EMPLOYER_CONTRIBUTION)
      // would be resolved from the step's metadata or joined component data.
      // We will assume the step object passed has 'type' and 'name' resolved by the caller.
      
      const componentName = step.componentName || 'Unknown Component';
      const componentType = step.componentType || 'EARNING'; // Default to earning if unknown
      
      const item = {
        component: componentName,
        formulaVersion: step.formulaHash || 'v1.0',
        calculatedValue: step.calculatedValue,
        currency: calculation.currencyId || 'INR' // or mapped symbol
      };

      if (componentType === 'EARNING') {
        earnings.push(item);
      } else if (componentType === 'DEDUCTION') {
        deductions.push(item);
      } else if (componentType === 'EMPLOYER_CONTRIBUTION') {
        employerContributions.push(item);
      }
    });

    const payslipId = crypto.randomUUID();
    const versionNumber = previousVersion + 1;
    const generatedTimestamp = new Date().toISOString();
    
    // Hash computation for audit metadata
    const rawDataStr = JSON.stringify({ calculationId: calculation.id, snapshotId: snapshot.id, version: versionNumber, generatedTimestamp });
    const checksum = crypto.createHash('sha256').update(rawDataStr).digest('hex');

    const payslip = {
      company: {
        name: companyData?.name || 'Company Name',
        businessUnit: companyData?.businessUnit || 'Default BU',
        branch: companyData?.branch || 'HQ',
        department: employeeData?.department || 'General',
        payrollPeriod: snapshotData.periodName || 'Current Period',
        currency: calculation.currencyId || 'INR',
        payDate: new Date().toISOString().split('T')[0],
        runNumber: snapshot.payrollRunId,
        payslipVersion: versionNumber
      },
      employee: {
        id: employeeData?.id || snapshot.employeeId,
        code: employeeData?.code || 'EMP-000',
        name: employeeData?.name || 'Unknown Employee',
        designation: employeeData?.designation || 'Staff',
        department: employeeData?.department || 'General',
        branch: employeeData?.branch || 'HQ',
        employmentType: employeeData?.employmentType || 'Full-Time',
        joiningDate: employeeData?.joiningDate || '2000-01-01',
        salaryStructureVersion: salaryStructureVersion
      },
      attendanceSummary,
      earnings,
      deductions,
      employerContributions,
      totals: {
        grossEarnings: calculation.grossPay || 0,
        grossDeductions: calculation.totalDeductions || 0,
        employerContributions: 0, // Should sum employer contributions if needed
        netPay: calculation.netPay || 0,
        roundedAmount: Math.round(calculation.netPay || 0),
        amountInWords: this.numberToWords(Math.round(calculation.netPay || 0))
      },
      reviewMetadata: {
        approvedBy: reviewMetadata?.approvedBy || null,
        approvalWorkflowVersion: reviewMetadata?.workflowVersion || null,
        finalReviewer: reviewMetadata?.finalReviewer || null,
        approvedTimestamp: reviewMetadata?.approvedTimestamp || null,
        lockedTimestamp: reviewMetadata?.lockedTimestamp || null,
        processedTimestamp: reviewMetadata?.processedTimestamp || null
      },
      auditMetadata: {
        calculationVersion: '1.0',
        snapshotVersion: '1.0',
        rulesVersion: '1.0',
        checksum,
        formulaHash: 'combo-hash',
        runId: snapshot.payrollRunId,
        calculationId: calculation.id,
        payslipId,
        generatedTimestamp
      }
    };

    return payslip;
  }

  private numberToWords(amount: number): string {
    // Simple stub for amount in words
    return `Rupees ${amount} Only`;
  }
}
