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
var KPIEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPIEngine = void 0;
const common_1 = require("@nestjs/common");
const report_execution_engine_1 = require("../engine/report-execution.engine");
let KPIEngine = KPIEngine_1 = class KPIEngine {
    constructor(engine) {
        this.engine = engine;
        this.logger = new common_1.Logger(KPIEngine_1.name);
    }
    async evaluateKPI(kpiDef, context) {
        const res = await this.engine.execute({
            dataset: kpiDef.dataset,
            query: kpiDef.query
        }, context);
        const val = res.data.reduce((acc, r) => acc + (r.salary || 0), 0) / (res.data.length || 1);
        const exceeded = val > kpiDef.thresholds.warning;
        if (exceeded) {
            this.logger.warn(`KPI Alert: Threshold Exceeded (Value: ${val} > ${kpiDef.thresholds.warning})`);
        }
        return { value: val, exceeded, explainability: res.explainability };
    }
};
exports.KPIEngine = KPIEngine;
exports.KPIEngine = KPIEngine = KPIEngine_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_execution_engine_1.ReportExecutionEngine])
], KPIEngine);
//# sourceMappingURL=kpi.engine.js.map