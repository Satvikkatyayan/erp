import { Controller, Get, Param, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RequestContext } from '../../../core/decorators/auth.decorators';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ApiResponseDto } from '../dtos/shared/api-response.dto';
import { PayrollMapper } from '../dtos/mapping/payroll.mapper';

// Services
import { PayrollQueryService } from '../services/payroll-query.service';

// DTOs
import { PayrollDashboardQueryDto } from '../dtos/queries/payroll-dashboard.query.dto';
import { PayrollRunQueryDto } from '../dtos/queries/payroll-run.query.dto';
import { EmployeePayrollQueryDto } from '../dtos/queries/employee-payroll.query.dto';
import { PayrollHistoryQueryDto } from '../dtos/queries/payroll-history.query.dto';
import { CalculationBreakdownQueryDto } from '../dtos/queries/calculation-breakdown.query.dto';
import { PayrollSearchQueryDto } from '../dtos/queries/payroll-search.query.dto';
import { ProjectPayrollQueryDto } from '../dtos/queries/project-payroll.query.dto';
import { DepartmentPayrollQueryDto } from '../dtos/queries/department-payroll.query.dto';
import { DesignationPayrollQueryDto } from '../dtos/queries/designation-payroll.query.dto';
import { BranchPayrollQueryDto } from '../dtos/queries/branch-payroll.query.dto';
import { CostCenterPayrollQueryDto } from '../dtos/queries/cost-center-payroll.query.dto';

@ApiTags('Payroll Queries')
@Controller('payroll')
export class PayrollQueryController {
  private readonly logger = new Logger(PayrollQueryController.name);

  constructor(
    private readonly queryService: PayrollQueryService,
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

  @Get('dashboard')
  @ApiOperation({ summary: 'Get payroll dashboard data' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getDashboard(@Query() query: PayrollDashboardQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getDashboardStats(ctx?.tenantId || 'default');
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs')
  @ApiOperation({ summary: 'Get payroll runs' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRuns(@Query() query: PayrollRunQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.searchAndFilterRuns(ctx?.tenantId || 'default', '', query);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs/:runId')
  @ApiOperation({ summary: 'Get payroll run by ID' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunById(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getPayrollRunDetails(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(this.mapper.toPayrollRunResponseDto(result), ctx?.correlationId || 'none');
  }

  @Get('runs/:runId/timeline')
  @ApiOperation({ summary: 'Get payroll run timeline' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunTimeline(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getPayrollTimeline(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs/:runId/history')
  @ApiOperation({ summary: 'Get payroll run history' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunHistory(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getPayrollEventHistory(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs/:runId/events')
  @ApiOperation({ summary: 'Get payroll run events' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunEvents(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getPayrollEventHistory(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs/:runId/calculations')
  @ApiOperation({ summary: 'Get payroll run calculations' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunCalculations(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getCalculationHistory(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs/:runId/snapshots')
  @ApiOperation({ summary: 'Get payroll run snapshots' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunSnapshots(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getPayrollSnapshotHistory(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('runs/:runId/version-history')
  @ApiOperation({ summary: 'Get payroll run version history' })
  @ApiParam({ name: 'runId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getRunVersionHistory(@Param('runId') runId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getVersionHistory(ctx?.tenantId || 'default', runId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('search')
  @ApiOperation({ summary: 'Search payrolls' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async searchPayrolls(@Query() query: PayrollSearchQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.searchAndFilterRuns(ctx?.tenantId || 'default', query.searchTerm || '', query);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('employees/:employeeId')
  @ApiOperation({ summary: 'Get employee payroll' })
  @ApiParam({ name: 'employeeId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getEmployeePayroll(@Param('employeeId') employeeId: string, @Query() query: EmployeePayrollQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getEmployeePayrollSummary(ctx?.tenantId || 'default', employeeId, 'currentRunId');
    return this.wrapResponse(result ? this.mapper.toEmployeePayrollResponseDto(result) : null, ctx?.correlationId || 'none');
  }

  @Get('employees/:employeeId/history')
  @ApiOperation({ summary: 'Get employee payroll history' })
  @ApiParam({ name: 'employeeId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getEmployeeHistory(@Param('employeeId') employeeId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getEmployeePayrollHistory(ctx?.tenantId || 'default', employeeId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('employees/:employeeId/payslips')
  @ApiOperation({ summary: 'Get employee payslips' })
  @ApiParam({ name: 'employeeId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getEmployeePayslips(@Param('employeeId') employeeId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getEmployeePayslipHistory(ctx?.tenantId || 'default', employeeId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('employees/:employeeId/latest-payslip')
  @ApiOperation({ summary: 'Get employee latest payslip' })
  @ApiParam({ name: 'employeeId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getEmployeeLatestPayslip(@Param('employeeId') employeeId: string, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getLatestPayslip({ tenantId: ctx?.tenantId || 'default', employeeId });
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('employees/:employeeId/calculation-breakdown')
  @ApiOperation({ summary: 'Get employee calculation breakdown' })
  @ApiParam({ name: 'employeeId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getCalculationBreakdown(@Param('employeeId') employeeId: string, @Query() query: CalculationBreakdownQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getEmployeeCalculationBreakdown(ctx?.tenantId || 'default', query.calculationId);
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get project payroll' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getProjectPayroll(@Query() query: ProjectPayrollQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getProjectPayrollSummary(ctx?.tenantId || 'default');
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('departments')
  @ApiOperation({ summary: 'Get department payroll' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getDepartmentPayroll(@Query() query: DepartmentPayrollQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getDepartmentPayrollSummary(ctx?.tenantId || 'default');
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('designations')
  @ApiOperation({ summary: 'Get designation payroll' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getDesignationPayroll(@Query() query: DesignationPayrollQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getDesignationPayrollSummary(ctx?.tenantId || 'default');
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('branches')
  @ApiOperation({ summary: 'Get branch payroll' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getBranchPayroll(@Query() query: BranchPayrollQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getBranchPayrollSummary(ctx?.tenantId || 'default');
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }

  @Get('cost-centers')
  @ApiOperation({ summary: 'Get cost center payroll' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async getCostCenterPayroll(@Query() query: CostCenterPayrollQueryDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<any>> {
    const result = await this.queryService.getCostCenterPayrollSummary(ctx?.tenantId || 'default');
    return this.wrapResponse(result, ctx?.correlationId || 'none');
  }
}