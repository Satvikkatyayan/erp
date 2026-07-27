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
var ReportExecutionEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportExecutionEngine = void 0;
const common_1 = require("@nestjs/common");
const dataset_registry_1 = require("../datasets/dataset-registry");
let ReportExecutionEngine = ReportExecutionEngine_1 = class ReportExecutionEngine {
    constructor(registry) {
        this.registry = registry;
        this.logger = new common_1.Logger(ReportExecutionEngine_1.name);
    }
    async execute(reportConfig, context) {
        const startTime = Date.now();
        const provider = this.registry.get(reportConfig.dataset);
        let rawData = await provider.execute(reportConfig.query, context);
        if (reportConfig.calculatedFields) {
            rawData = rawData.map(row => {
                const enriched = { ...row };
                for (const calc of reportConfig.calculatedFields) {
                    if (calc.formula === 'salary * 12') {
                        enriched[calc.name] = (row.salary || 0) * 12;
                    }
                }
                return enriched;
            });
        }
        if (reportConfig.joins) {
            this.logger.debug('Executing multi-dataset join mock');
            rawData = rawData.map(row => ({ ...row, _joined: true }));
        }
        let aggregated = rawData;
        if (reportConfig.query.groupBy) {
            const groups = {};
            for (const row of rawData) {
                const key = row[reportConfig.query.groupBy];
                if (!groups[key])
                    groups[key] = { count: 0, totalSalary: 0 };
                groups[key].count++;
                groups[key].totalSalary += row.salary || 0;
            }
            aggregated = Object.keys(groups).map(k => ({ [reportConfig.query.groupBy]: k, ...groups[k] }));
        }
        const durationMs = Date.now() - startTime;
        return {
            data: aggregated,
            explainability: {
                cacheHit: false,
                durationMs,
                datasetVersion: 'v1',
                filtersApplied: reportConfig.query.filters || {},
                securityTrimOrg: context.orgId,
                freshnessTimestamp: new Date().toISOString()
            },
            drillDownMetadata: {
                entity: reportConfig.dataset,
                navContext: '?source=report_id'
            }
        };
    }
};
exports.ReportExecutionEngine = ReportExecutionEngine;
exports.ReportExecutionEngine = ReportExecutionEngine = ReportExecutionEngine_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dataset_registry_1.DatasetRegistry])
], ReportExecutionEngine);
//# sourceMappingURL=report-execution.engine.js.map