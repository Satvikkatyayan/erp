import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PaySalaryAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payEmployeeSalaryAssignment.findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.payEmployeeSalaryAssignment.update({ where: { id: data.id }, data });
    }
    return client.payEmployeeSalaryAssignment.create({ data });
  }
}
