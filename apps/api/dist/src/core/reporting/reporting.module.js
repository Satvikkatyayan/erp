"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportingModule = void 0;
const common_1 = require("@nestjs/common");
const dataset_registry_1 = require("./datasets/dataset-registry");
const mock_employee_dataset_1 = require("./datasets/mock-employee.dataset");
const report_execution_engine_1 = require("./engine/report-execution.engine");
const kpi_engine_1 = require("./kpi/kpi.engine");
const platform_reporting_sdk_1 = require("./sdk/platform-reporting.sdk");
let ReportingModule = class ReportingModule {
};
exports.ReportingModule = ReportingModule;
exports.ReportingModule = ReportingModule = __decorate([
    (0, common_1.Module)({
        providers: [
            dataset_registry_1.DatasetRegistry,
            mock_employee_dataset_1.MockEmployeeDatasetProvider,
            report_execution_engine_1.ReportExecutionEngine,
            kpi_engine_1.KPIEngine,
            platform_reporting_sdk_1.PlatformReportingSDK
        ],
        exports: [platform_reporting_sdk_1.PlatformReportingSDK]
    })
], ReportingModule);
//# sourceMappingURL=reporting.module.js.map