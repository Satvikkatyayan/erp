import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PaySalaryComponentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.paySalaryComponent.findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.paySalaryComponent.update({ where: { id: data.id }, data });
    }
    return client.paySalaryComponent.create({ data });
  }
}
