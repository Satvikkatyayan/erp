"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollModule = void 0;
const payroll_query_service_1 = require("./services/payroll-query.service");
const common_1 = require("@nestjs/common");
const payroll_formula_engine_1 = require("./services/payroll-formula.engine");
const payroll_calculation_service_1 = require("./services/payroll-calculation.service");
const payroll_run_service_1 = require("./services/payroll-run.service");
const payslip_service_1 = require("./services/payslip.service");
const journal_service_1 = require("./services/journal.service");
const prisma_module_1 = require("../../common/prisma/prisma.module");
let PayrollModule = class PayrollModule {
};
exports.PayrollModule = PayrollModule;
exports.PayrollModule = PayrollModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [
            payroll_query_service_1.PayrollQueryService,
            payroll_formula_engine_1.PayrollFormulaEngine,
            payroll_calculation_service_1.PayrollCalculationService,
            payroll_run_service_1.PayrollRunService,
            payslip_service_1.PayslipService,
            journal_service_1.JournalService
        ],
        exports: [
            payroll_query_service_1.PayrollQueryService, payroll_run_service_1.PayrollRunService, journal_service_1.JournalService, payslip_service_1.PayslipService
        ]
    })
], PayrollModule);
//# sourceMappingURL=payroll.module.js.map