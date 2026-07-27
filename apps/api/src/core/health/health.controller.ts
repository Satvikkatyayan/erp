import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../../common/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private prismaService: PrismaService,
  ) {}

  @Get()
  check() {
    return this.health.check([
      () => this.prisma.pingCheck('database', this.prismaService as any),
    ]);
  }
}