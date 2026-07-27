$repoDir = "d:\erpvvinfratech\apps\api\src\modules\payroll\repositories"

$repos = @(
  @{name="payroll-policy"; class="PayPayrollPolicyRepository"; model="payPayrollPolicy"},
  @{name="payroll-period"; class="PayPayrollPeriodRepository"; model="payPayrollPeriod"},
  @{name="salary-component"; class="PaySalaryComponentRepository"; model="paySalaryComponent"},
  @{name="salary-structure"; class="PaySalaryStructureRepository"; model="paySalaryStructure"},
  @{name="salary-assignment"; class="PaySalaryAssignmentRepository"; model="payEmployeeSalaryAssignment"},
  @{name="payroll-run"; class="PayPayrollRunRepository"; model="payPayrollRun"},
  @{name="payroll-snapshot"; class="PayPayrollSnapshotRepository"; model="payPayrollSnapshot"},
  @{name="payroll-calculation"; class="PayPayrollCalculationRepository"; model="payPayrollCalculation"},
  @{name="calculation-step"; class="PayCalculationStepRepository"; model="payCalculationStep"},
  @{name="payslip"; class="PayPayslipRepository"; model="payPayslip"}
)

foreach ($repo in $repos) {
  $content = @"
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class $($repo.class) {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.$($repo.model).findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.$($repo.model).update({ where: { id: data.id }, data });
    }
    return client.$($repo.model).create({ data });
  }
}
"@
  Set-Content -Path "$repoDir\$($repo.name).repository.ts" -Value $content
}
