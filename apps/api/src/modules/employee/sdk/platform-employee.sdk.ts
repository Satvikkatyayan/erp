import { Injectable } from '@nestjs/common';
import { EmployeeQueryService } from '../services/employee-query.service';
import { EmployeeProfileDto, EmployeeSummaryDto, JobAssignmentDto, TimelineEntryDto } from './dtos/employee-sdk.dto';

@Injectable()
export class PlatformEmployeeSDK {
  constructor(private readonly queryService: EmployeeQueryService) {}

  // Core Employee
  async getEmployeeProfile(tenantId: string, employeeId: string): Promise<EmployeeProfileDto | null> {
    const raw = await this.queryService.findEmployeeById(tenantId, employeeId);
    if (!raw) return null;
    return {
      id: raw.id,
      tenantId: raw.tenantId,
      organizationId: raw.organizationId,
      employeeNumber: raw.employeeNumber,
      status: raw.status,
      personalDetails: raw.personalDetails
    };
  }

  async getEmployeeSummary(tenantId: string, employeeId: string): Promise<EmployeeSummaryDto | null> {
    const raw = await this.queryService.findEmployeeSummary(tenantId, employeeId);
    if (!raw) return null;
    return {
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    };
  }

  async getEmploymentStatus(tenantId: string, employeeId: string): Promise<string | null> {
    return this.queryService.findEmploymentStatus(tenantId, employeeId);
  }

  async isEmployeeActive(tenantId: string, employeeId: string): Promise<boolean> {
    return this.queryService.isEmployeeActive(tenantId, employeeId);
  }

  async exists(tenantId: string, employeeId: string): Promise<boolean> {
    return this.queryService.exists(tenantId, employeeId);
  }

  // Current Assignment
  async getCurrentAssignment(tenantId: string, employeeId: string): Promise<JobAssignmentDto | null> {
    const raw = await this.queryService.findEmployeeJobAssignment(tenantId, employeeId);
    if (!raw) return null;
    return {
      id: raw.id,
      employeeId: raw.employeeId,
      departmentId: raw.departmentId,
      designationId: raw.designationId,
      managerId: raw.managerId,
      projectId: raw.projectId,
      branchId: raw.branchId,
      effectiveFrom: raw.effectiveFrom,
      effectiveTo: raw.effectiveTo
    };
  }

  async getCurrentDepartment(tenantId: string, employeeId: string): Promise<string | null> {
    return this.queryService.findCurrentDepartment(tenantId, employeeId);
  }

  async getCurrentDesignation(tenantId: string, employeeId: string): Promise<string | null> {
    return this.queryService.findCurrentDesignation(tenantId, employeeId);
  }

  async getCurrentManager(tenantId: string, employeeId: string): Promise<string | null> {
    return this.queryService.findCurrentManager(tenantId, employeeId);
  }

  async getCurrentProject(tenantId: string, employeeId: string): Promise<string | null> {
    return this.queryService.findCurrentProject(tenantId, employeeId);
  }

  // Assignment History
  async getAssignmentHistory(tenantId: string, employeeId: string): Promise<JobAssignmentDto[]> {
    const rawList = await this.queryService.findAssignmentHistory(tenantId, employeeId);
    return rawList.map(raw => ({
      id: raw.id,
      employeeId: raw.employeeId,
      departmentId: raw.departmentId,
      designationId: raw.designationId,
      managerId: raw.managerId,
      projectId: raw.projectId,
      branchId: raw.branchId,
      effectiveFrom: raw.effectiveFrom,
      effectiveTo: raw.effectiveTo
    }));
  }

  async getTimeline(tenantId: string, employeeId: string): Promise<TimelineEntryDto[]> {
    const rawList = await this.queryService.findTimeline(tenantId, employeeId);
    return rawList.map(raw => ({
      id: raw.id,
      eventType: raw.eventType,
      eventDate: raw.eventDate,
      metadata: raw.metadata
    }));
  }

  // Search
  async searchEmployees(tenantId: string, filters?: any): Promise<EmployeeSummaryDto[]> {
    const rawList = await this.queryService.searchEmployees(tenantId, filters);
    return rawList.map(raw => ({
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    }));
  }

  async getEmployeesByManager(tenantId: string, managerId: string): Promise<EmployeeSummaryDto[]> {
    const rawList = await this.queryService.findEmployeesByManager(tenantId, managerId);
    return rawList.map(raw => ({
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    }));
  }

  async getEmployeesByDepartment(tenantId: string, departmentId: string): Promise<EmployeeSummaryDto[]> {
    const rawList = await this.queryService.findEmployeesByDepartment(tenantId, departmentId);
    return rawList.map(raw => ({
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    }));
  }

  async getEmployeesByProject(tenantId: string, projectId: string): Promise<EmployeeSummaryDto[]> {
    const rawList = await this.queryService.findEmployeesByProject(tenantId, projectId);
    return rawList.map(raw => ({
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    }));
  }

  // Organization
  async getEmployeesByOrganization(tenantId: string, organizationId: string): Promise<EmployeeSummaryDto[]> {
    const rawList = await this.queryService.findEmployeesByOrganization(tenantId, organizationId);
    return rawList.map(raw => ({
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    }));
  }

  async getEmployeesByBranch(tenantId: string, branchId: string): Promise<EmployeeSummaryDto[]> {
    const rawList = await this.queryService.findEmployeesByBranch(tenantId, branchId);
    return rawList.map(raw => ({
      id: raw.id,
      employeeNumber: raw.employeeNumber,
      status: raw.status
    }));
  }

  // Employment
  async getJoiningDate(tenantId: string, employeeId: string): Promise<Date | null> {
    return this.queryService.findJoiningDate(tenantId, employeeId);
  }

  async getConfirmationStatus(tenantId: string, employeeId: string): Promise<boolean> {
    return this.queryService.findConfirmationStatus(tenantId, employeeId);
  }

  async isOnProbation(tenantId: string, employeeId: string): Promise<boolean> {
    return this.queryService.isOnProbation(tenantId, employeeId);
  }

  async hasCompletedProbation(tenantId: string, employeeId: string): Promise<boolean> {
    return this.queryService.hasCompletedProbation(tenantId, employeeId);
  }

  // Exit
  async isExited(tenantId: string, employeeId: string): Promise<boolean> {
    return this.queryService.isExited(tenantId, employeeId);
  }

  async getExitInformation(tenantId: string, employeeId: string): Promise<any> {
    return this.queryService.findExitInformation(tenantId, employeeId);
  }

  // Validation Helpers
  async validateEmployee(tenantId: string, employeeId: string): Promise<void> {
    const exists = await this.exists(tenantId, employeeId);
    if (!exists) {
      throw new Error(`Employee with ID ${employeeId} not found in tenant ${tenantId}.`);
    }
  }

  async validateActiveEmployee(tenantId: string, employeeId: string): Promise<void> {
    const isActive = await this.isEmployeeActive(tenantId, employeeId);
    if (!isActive) {
      throw new Error(`Employee with ID ${employeeId} is not active in tenant ${tenantId}.`);
    }
  }

  // Team Scope
  async getTeamScopeIds(ctx: any, employeeId: string, allowIndirect: boolean, maxDepth: number): Promise<string[]> {
    return this.queryService.getTeamScopeIds(ctx, employeeId, allowIndirect, maxDepth);
  }
}
