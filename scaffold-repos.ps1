$models = @("DailySiteMuster", "MusterSnapshot", "AttendanceDay", "AttendanceSession", "AttendancePunch", "AttendanceReview", "MusterTimeline", "EmployeeTimeline")
$basePath = "d:\erpvvinfratech\apps\api\src\modules\attendance\repositories"

foreach ($model in $models) {
    # Convert PascalCase to kebab-case
    $kebabName = $model -replace '([a-z])([A-Z])', '$1-$2'
    $kebabName = $kebabName.ToLower()

    $content = @"
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class $($model)Repository {
  constructor(private readonly prisma: PrismaService) {}

  // Basic CRUD placeholders to satisfy compilation
  async findById(id: string) {
    return this.prisma.$($model.Substring(0,1).ToLower() + $model.Substring(1)).findUnique({ where: { id } });
  }
}
"@
    
    $filePath = Join-Path $basePath "$kebabName.repository.ts"
    Set-Content -Path $filePath -Value $content
}
