import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeAssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  // Handles effective dated assignment changes
}
