import { Injectable } from '@nestjs/common';
import { EmpEmployeeRepository } from '../repositories/employee.repository';
import { EmpJobAssignmentRepository } from '../repositories/job-assignment.repository';
import { EmpEmployeeTimelineRepository } from '../repositories/timeline.repository';

@Injectable()
export class EmployeeQueryService {
  constructor(
    private readonly employeeRepo: EmpEmployeeRepository,
    private readonly jobAssignmentRepo: EmpJobAssignmentRepository,
    private readonly timelineRepo: EmpEmployeeTimelineRepository
  ) {}

  // Core Employee
  async findEmployeeById(tenantId: string, employeeId: string): Promise<any> {
    return this.employeeRepo.findEmployeeById(tenantId, employeeId);
  }

  async findEmployeeSummary(tenantId: string, employeeId: string): Promise<any> {
    return this.employeeRepo.findEmployeeById(tenantId, employeeId);
  }

  async findEmploymentStatus(tenantId: string, employeeId: string): Promise<string | null> {
    const emp = await this.employeeRepo.findEmployeeById(tenantId, employeeId);
    return emp ? emp.status : null;
  }

  async isEmployeeActive(tenantId: string, employeeId: string): Promise<boolean> {
    const status = await this.findEmploymentStatus(tenantId, employeeId);
    return ['JOINED', 'PROBATION', 'CONFIRMED', 'NOTICE_PERIOD'].includes(status || '');
  }

  async exists(tenantId: string, employeeId: string): Promise<boolean> {
    return this.employeeRepo.exists(tenantId, employeeId);
  }

  // Current Assignment
  async findEmployeeJobAssignment(tenantId: string, employeeId: string): Promise<any> {
    return this.jobAssignmentRepo.findCurrentJobAssignment(tenantId, employeeId);
  }

  async findCurrentDepartment(tenantId: string, employeeId: string): Promise<string | null> {
    const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
    return assign ? assign.departmentId : null;
  }

  async findCurrentDesignation(tenantId: string, employeeId: string): Promise<string | null> {
    const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
    return assign ? assign.designationId : null;
  }

  async findCurrentManager(tenantId: string, employeeId: string): Promise<string | null> {
    const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
    return assign ? assign.managerId : null;
  }

  async findCurrentProject(tenantId: string, employeeId: string): Promise<string | null> {
    const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
    return assign ? assign.projectId : null;
  }

  // Assignment History
  async findAssignmentHistory(tenantId: string, employeeId: string): Promise<any[]> {
    return this.jobAssignmentRepo.findAssignmentHistory(tenantId, employeeId);
  }

  async findTimeline(tenantId: string, employeeId: string): Promise<any[]> {
    return this.timelineRepo.getTimeline(tenantId, employeeId);
  }

  // Search
  async searchEmployees(tenantId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.employeeRepo.searchEmployees(tenantId, filters, sort);
  }

  async findEmployeesByManager(tenantId: string, managerId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.employeeRepo.findEmployeesByManager(tenantId, managerId, filters, sort);
  }

  async findEmployeesByDepartment(tenantId: string, departmentId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.employeeRepo.findEmployeesByDepartment(tenantId, departmentId, filters, sort);
  }

  async findEmployeesByProject(tenantId: string, projectId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.employeeRepo.findEmployeesByProject(tenantId, projectId, filters, sort);
  }

  // Organization
  async findEmployeesByOrganization(tenantId: string, organizationId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.employeeRepo.findEmployeesByOrganization(tenantId, organizationId, filters, sort);
  }

  async findEmployeesByBranch(tenantId: string, branchId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.employeeRepo.findEmployeesByBranch(tenantId, branchId, filters, sort);
  }

  // Employment
  async findJoiningDate(tenantId: string, employeeId: string): Promise<Date | null> {
    const timeline = await this.findTimeline(tenantId, employeeId);
    const joinEvent = timeline.find((t: any) => t.eventType === 'JOINED' || t.eventType === 'ONBOARDED');
    return joinEvent ? joinEvent.eventDate : null;
  }

  async findConfirmationStatus(tenantId: string, employeeId: string): Promise<boolean> {
    const status = await this.findEmploymentStatus(tenantId, employeeId);
    return status === 'CONFIRMED';
  }

  async isOnProbation(tenantId: string, employeeId: string): Promise<boolean> {
    const status = await this.findEmploymentStatus(tenantId, employeeId);
    return status === 'PROBATION';
  }

  async hasCompletedProbation(tenantId: string, employeeId: string): Promise<boolean> {
    const status = await this.findEmploymentStatus(tenantId, employeeId);
    return ['CONFIRMED', 'NOTICE_PERIOD', 'EXITED', 'TERMINATED'].includes(status || ''); // Assuming these statuses imply completion or passage of probation
  }

  // Exit
  async isExited(tenantId: string, employeeId: string): Promise<boolean> {
    const status = await this.findEmploymentStatus(tenantId, employeeId);
    return ['EXITED', 'TERMINATED'].includes(status || '');
  }

  async findExitInformation(tenantId: string, employeeId: string): Promise<any> {
    const timeline = await this.findTimeline(tenantId, employeeId);
    const exitEvent = timeline.find((t: any) => t.eventType === 'EXITED' || t.eventType === 'TERMINATED' || t.eventType === 'RESIGNED');
    return exitEvent ? exitEvent.metadata : null;
  }

  async getTeamScopeIds(ctx: any, employeeId: string, allowIndirect: boolean, maxDepth: number): Promise<string[]> {
    // Stub implementation to satisfy compilation. To be implemented properly in future phases.
    return [employeeId];
  }
}
