"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongSiteDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let WrongSiteDetector = class WrongSiteDetector {
    constructor() {
        this.identifier = 'WrongSiteDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { snapshot: true, attendanceDays: true }
        });
        if (!muster || !muster.snapshot || !muster.snapshot.snapshotData)
            return [];
        const snapshotData = muster.snapshot.snapshotData;
        const expectedEmployees = Array.isArray(snapshotData) ? snapshotData : (snapshotData.assignments || []);
        const expectedSiteMap = new Map(expectedEmployees.map(e => [e.employeeId, e.siteId || muster.siteId]));
        const results = [];
        for (const day of muster.attendanceDays) {
            const assignedSiteId = expectedSiteMap.get(day.employeeId);
            if (assignedSiteId && assignedSiteId !== muster.siteId) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.WRONG_SITE,
                    severity: client_1.AttendanceExceptionSeverity.HIGH,
                    priority: 90,
                    description: `Employee marked attendance at Site B but is assigned to Site A.`,
                    recommendedAction: 'Cross-check transfer requests or reject attendance.',
                    attendanceDayId: day.id,
                    employeeId: day.employeeId
                });
            }
        }
        return results;
    }
};
exports.WrongSiteDetector = WrongSiteDetector;
exports.WrongSiteDetector = WrongSiteDetector = __decorate([
    (0, common_1.Injectable)()
], WrongSiteDetector);
//# sourceMappingURL=wrong-site.detector.js.map