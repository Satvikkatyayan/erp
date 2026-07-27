import { Injectable } from '@nestjs/common';
import { IDatasetProvider } from './dataset-provider.interface';

@Injectable()
export class MockEmployeeDatasetProvider implements IDatasetProvider {
  code = 'EMPLOYEE_DATA';
  
  getMetadata() {
    return {
      fields: ['id', 'name', 'salary', 'department', 'orgId'],
      securityModel: 'ORGANIZATION'
    };
  }

  async execute(query: any, context: any): Promise<any[]> {
    // Mock DB payload
    const data = [
      { id: '1', name: 'Alice', salary: 100000, department: 'Engineering', orgId: 'org-123' },
      { id: '2', name: 'Bob', salary: 50000, department: 'HR', orgId: 'org-123' },
      { id: '3', name: 'Charlie', salary: 120000, department: 'Engineering', orgId: 'org-456' } // Different Org
    ];
    
    // Security Trim (simulate RBAC)
    let results = data.filter(r => r.orgId === context.orgId);
    
    // Apply Query Filters
    if (query.filters?.department) {
      results = results.filter(r => r.department === query.filters.department);
    }
    
    return results;
  }
}