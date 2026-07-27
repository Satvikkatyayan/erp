"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceTestSeedBuilder = void 0;
const uuid_1 = require("uuid");
class AttendanceTestSeedBuilder {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async cleanDatabase() {
        await this.prisma.attendanceException.deleteMany();
        await this.prisma.attendanceSummary.deleteMany();
        await this.prisma.attendancePunch.deleteMany();
        await this.prisma.attendanceSession.deleteMany();
        await this.prisma.attendanceDay.deleteMany();
        await this.prisma.employeeTimeline.deleteMany();
        await this.prisma.musterTimeline.deleteMany();
        await this.prisma.attendanceReview.deleteMany();
        await this.prisma.musterSnapshot.deleteMany();
        await this.prisma.dailySiteMuster.deleteMany();
        await this.prisma.empJobAssignment.deleteMany();
        await this.prisma.empEmployee.deleteMany();
        await this.prisma.payPayrollPeriod.deleteMany();
        await this.prisma.site.deleteMany();
        await this.prisma.project.deleteMany();
        await this.prisma.branch.deleteMany();
        await this.prisma.organization.deleteMany();
    }
    async buildEnterprise() {
        const orgId = (0, uuid_1.v4)();
        const branchId = (0, uuid_1.v4)();
        const projectId = (0, uuid_1.v4)();
        const siteId = (0, uuid_1.v4)();
        await this.prisma.organization.create({
            data: { id: orgId, name: 'V V Infratech Enterprise', code: 'VV' }
        });
        await this.prisma.branch.create({
            data: { id: branchId, organizationId: orgId, name: 'Main Branch', code: 'MAIN' }
        });
        await this.prisma.project.create({
            data: { id: projectId, organizationId: orgId, branchId: branchId, name: 'Highway Expansion', code: 'HWY' }
        });
        await this.prisma.site.create({
            data: { id: siteId, projectId, name: 'Sector 4', code: 'SEC4' }
        });
        return { orgId, branchId, projectId, siteId };
    }
    async buildEmployees(branchId, siteId) {
        const employeeId = (0, uuid_1.v4)();
        const managerId = (0, uuid_1.v4)();
        const hrId = (0, uuid_1.v4)();
        await this.prisma.empEmployee.createMany({
            data: [
                { id: employeeId, organizationId: (0, uuid_1.v4)(), employeeCode: 'EMP001', firstName: 'Worker', lastName: 'One', status: 'ACTIVE', type: 'FULL_TIME' },
                { id: managerId, organizationId: (0, uuid_1.v4)(), employeeCode: 'PM001', firstName: 'Project', lastName: 'Manager', status: 'ACTIVE', type: 'FULL_TIME' },
                { id: hrId, organizationId: (0, uuid_1.v4)(), employeeCode: 'HR001', firstName: 'HR', lastName: 'Manager', status: 'ACTIVE', type: 'FULL_TIME' }
            ]
        });
        await this.prisma.empJobAssignment.create({
            data: {
                id: (0, uuid_1.v4)(),
                employeeId,
                siteId,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                isPrimary: true,
                status: 'ACTIVE'
            }
        });
        return { employeeId, managerId, hrId };
    }
    async buildPayrollPeriod() {
        const periodId = (0, uuid_1.v4)();
        await this.prisma.payPayrollPeriod.create({
            data: {
                id: periodId,
                name: 'July 2026',
                startDate: new Date('2026-07-01'),
                endDate: new Date('2026-07-31'),
                status: 'OPEN'
            }
        });
        return { periodId };
    }
}
exports.AttendanceTestSeedBuilder = AttendanceTestSeedBuilder;
//# sourceMappingURL=attendance-test-seed.builder.js.map