import { EssModule } from './modules/ess/ess.module';
import { MssModule } from './modules/mss/mss.module';
import { OffboardingModule } from './modules/offboarding/offboarding.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { LoggerModule } from './common/logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { LeaveModule } from './modules/leave/leave.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { PerformanceModule } from './modules/performance/performance.module';
import { AssetsModule } from './modules/assets/assets.module';

@Module({
  imports: [
    EssModule,
    MssModule,
    OffboardingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
    }),
    LoggerModule,
    PrismaModule,
    AuthModule,
    CoreModule,
    EmployeeModule,
    RecruitmentModule,
    AttendanceModule,
    LeaveModule,
    PayrollModule,
    PerformanceModule,
    AssetsModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
