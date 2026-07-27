"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmployeeDatasetProvider = void 0;
const common_1 = require("@nestjs/common");
let MockEmployeeDatasetProvider = class MockEmployeeDatasetProvider {
    constructor() {
        this.code = 'EMPLOYEE_DATA';
    }
    getMetadata() {
        return {
            fields: ['id', 'name', 'salary', 'department', 'orgId'],
            securityModel: 'ORGANIZATION'
        };
    }
    async execute(query, context) {
        const data = [
            { id: '1', name: 'Alice', salary: 100000, department: 'Engineering', orgId: 'org-123' },
            { id: '2', name: 'Bob', salary: 50000, department: 'HR', orgId: 'org-123' },
            { id: '3', name: 'Charlie', salary: 120000, department: 'Engineering', orgId: 'org-456' }
        ];
        let results = data.filter(r => r.orgId === context.orgId);
        if (query.filters?.department) {
            results = results.filter(r => r.department === query.filters.department);
        }
        return results;
    }
};
exports.MockEmployeeDatasetProvider = MockEmployeeDatasetProvider;
exports.MockEmployeeDatasetProvider = MockEmployeeDatasetProvider = __decorate([
    (0, common_1.Injectable)()
], MockEmployeeDatasetProvider);
//# sourceMappingURL=mock-employee.dataset.js.map