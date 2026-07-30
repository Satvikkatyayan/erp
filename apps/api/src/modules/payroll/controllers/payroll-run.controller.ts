import { Controller, Post, Param, Body, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RequestContext } from '../../../core/decorators/auth.decorators';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ApiResponseDto } from '../dtos/shared/api-response.dto';
import { PayrollMapper } from '../dtos/mapping/payroll.mapper';

// DTOs
import { CreatePayrollRunDto } from '../dtos/commands/create-payroll-run.dto';
import { StartPayrollCollectionDto } from '../dtos/commands/start-payroll-collection.dto';
import { GeneratePayrollSnapshotsDto } from '../dtos/commands/generate-payroll-snapshots.dto';
import { CalculatePayrollDto } from '../dtos/commands/calculate-payroll.dto';
import { ApprovePayrollDto } from '../dtos/commands/approve-payroll.dto';
import { LockPayrollDto } from '../dtos/commands/lock-payroll.dto';
import { ProcessPayrollDto } from '../dtos/commands/process-payroll.dto';
import { CancelPayrollDto } from '../dtos/commands/cancel-payroll.dto';
import { ReopenPayrollDto } from '../dtos/commands/reopen-payroll.dto';

// Commands
import { CreatePayrollRunCommand } from '../commands/create-payroll-run.command';
import { StartPayrollCollectionCommand } from '../commands/start-payroll-collection.command';
import { GeneratePayrollSnapshotsCommand } from '../commands/generate-payroll-snapshots.command';
import { CalculatePayrollCommand } from '../commands/calculate-payroll.command';
import { ApprovePayrollCommand } from '../commands/approve-payroll.command';
import { LockPayrollCommand } from '../commands/lock-payroll.command';
import { ProcessPayrollCommand } from '../commands/process-payroll.command';
import { CancelPayrollCommand } from '../commands/cancel-payroll.command';
import { ReopenPayrollCommand } from '../commands/reopen-payroll.command';

// Handlers
import { CreatePayrollRunHandler } from '../commands/handlers/create-payroll-run.handler';
import { StartPayrollCollectionHandler } from '../commands/handlers/start-payroll-collection.handler';
import { GeneratePayrollSnapshotsHandler } from '../commands/handlers/generate-payroll-snapshots.handler';
import { CalculatePayrollHandler } from '../commands/handlers/calculate-payroll.handler';
import { ApprovePayrollHandler } from '../commands/handlers/approve-payroll.handler';
import { LockPayrollHandler } from '../commands/handlers/lock-payroll.handler';
import { ProcessPayrollHandler } from '../commands/handlers/process-payroll.handler';
import { CancelPayrollHandler } from '../commands/handlers/cancel-payroll.handler';
import { ReopenPayrollHandler } from '../commands/handlers/reopen-payroll.handler';

@ApiTags('Payroll Runs')
@Controller('payroll/runs')
export class PayrollRunController {
  private readonly logger = new Logger(PayrollRunController.name);

  constructor(
    private readonly createPayrollRunHandler: CreatePayrollRunHandler,
    private readonly startPayrollCollectionHandler: StartPayrollCollectionHandler,
    private readonly generatePayrollSnapshotsHandler: GeneratePayrollSnapshotsHandler,
    private readonly calculatePayrollHandler: CalculatePayrollHandler,
    private readonly approvePayrollHandler: ApprovePayrollHandler,
    private readonly lockPayrollHandler: LockPayrollHandler,
    private readonly processPayrollHandler: ProcessPayrollHandler,
    private readonly cancelPayrollHandler: CancelPayrollHandler,
    private readonly reopenPayrollHandler: ReopenPayrollHandler,
    private readonly mapper: PayrollMapper
  ) {}

  private wrapResponse<T>(data: T, requestId: string): ApiResponseDto<T> {
    return {
      success: true,
      message: 'Success',
      data,
      timestamp: new Date().toISOString(),
      requestId,
      version: '1'
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new payroll run' })
  @ApiResponse({ status: 201, type: ApiResponseDto })
  async createRun(@Body() dto: CreatePayrollRunDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const cmd = this.mapper.toCreatePayrollRunCommand(dto, ctx?.tenantId || 'default');
    this.logger.log(`Payroll Run Created for period ${dto.periodId}`);
    const result = await this.createPayrollRunHandler.execute(new CreatePayrollRunCommand(ctx, cmd.periodId, cmd.runType));
    return this.wrapResponse({ runId: result }, ctx?.correlationId || 'none');
  }

  @Post(':runId/collect')
  @ApiOperation({ summary: 'Start data collection for a payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async collectRun(@Param('runId') runId: string, @Body() dto: StartPayrollCollectionDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Collection Started for run ${runId}`);
    await this.startPayrollCollectionHandler.execute(new StartPayrollCollectionCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/generate-snapshots')
  @ApiOperation({ summary: 'Generate snapshots for a payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async generateSnapshots(@Param('runId') runId: string, @Body() dto: GeneratePayrollSnapshotsDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Snapshots Generated for run ${runId}`);
    await this.generatePayrollSnapshotsHandler.execute(new GeneratePayrollSnapshotsCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/calculate')
  @ApiOperation({ summary: 'Calculate payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async calculateRun(@Param('runId') runId: string, @Body() dto: CalculatePayrollDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Payroll Calculated for run ${runId}`);
    await this.calculatePayrollHandler.execute(new CalculatePayrollCommand(ctx, runId, dto.currencyId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/approve')
  @ApiOperation({ summary: 'Approve payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async approveRun(@Param('runId') runId: string, @Body() dto: ApprovePayrollDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Payroll Approved for run ${runId}`);
    await this.approvePayrollHandler.execute(new ApprovePayrollCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/lock')
  @ApiOperation({ summary: 'Lock payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async lockRun(@Param('runId') runId: string, @Body() dto: LockPayrollDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Payroll Locked for run ${runId}`);
    await this.lockPayrollHandler.execute(new LockPayrollCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/process')
  @ApiOperation({ summary: 'Process payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async processRun(@Param('runId') runId: string, @Body() dto: ProcessPayrollDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Payroll Processed for run ${runId}`);
    await this.processPayrollHandler.execute(new ProcessPayrollCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/cancel')
  @ApiOperation({ summary: 'Cancel payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async cancelRun(@Param('runId') runId: string, @Body() dto: CancelPayrollDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Payroll Cancelled for run ${runId}`);
    await this.cancelPayrollHandler.execute(new CancelPayrollCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':runId/reopen')
  @ApiOperation({ summary: 'Reopen payroll run' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async reopenRun(@Param('runId') runId: string, @Body() dto: ReopenPayrollDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.runId = runId;
    this.logger.log(`Payroll Reopened for run ${runId}`);
    await this.reopenPayrollHandler.execute(new ReopenPayrollCommand(ctx, runId));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }
}