"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PlatformReportingSDK_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformReportingSDK = void 0;
const common_1 = require("@nestjs/common");
const report_execution_engine_1 = require("../engine/report-execution.engine");
const kpi_engine_1 = require("../kpi/kpi.engine");
let PlatformReportingSDK = PlatformReportingSDK_1 = class PlatformReportingSDK {
    constructor(engine, kpi) {
        this.engine = engine;
        this.kpi = kpi;
        this.logger = new common_1.Logger(PlatformReportingSDK_1.name);
    }
    async runReport(reportConfig, context) {
        return this.engine.execute(reportConfig, context);
    }
    async runCachedReport(snapshotHash) {
        this.logger.debug('Returning Materialized Cache for ' + snapshotHash);
        return { data: [{ cached: true }], explainability: { cacheHit: true, durationMs: 2 } };
    }
    async evaluateKPI(kpiDef, context) {
        return this.kpi.evaluateKPI(kpiDef, context);
    }
    async scheduleExportPipeline(reportConfig, context) {
        this.logger.log('Starting Scheduled Report Export Pipeline...');
        const result = await this.engine.execute(reportConfig, context);
        this.logger.log(' - Exporting to Storage Platform (CSV/PDF)...');
        this.logger.log(' - Pushing to Notification Platform...');
        return true;
    }
};
exports.PlatformReportingSDK = PlatformReportingSDK;
exports.PlatformReportingSDK = PlatformReportingSDK = PlatformReportingSDK_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_execution_engine_1.ReportExecutionEngine,
        kpi_engine_1.KPIEngine])
], PlatformReportingSDK);
//# sourceMappingURL=platform-reporting.sdk.js.map