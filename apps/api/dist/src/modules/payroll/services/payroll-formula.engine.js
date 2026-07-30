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
var PayrollFormulaEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollFormulaEngine = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PayrollFormulaEngine = PayrollFormulaEngine_1 = class PayrollFormulaEngine {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PayrollFormulaEngine_1.name);
    }
    async evaluateComponent(ctx, employeeId, componentCode, inputs, tx) {
        this.logger.debug(`Evaluating ${componentCode} via Rules SDK...`);
        let value = 0;
        let hash = `RULE_${componentCode}_v1`;
        if (componentCode.startsWith('BASIC')) {
            value = inputs['ctc'] * 0.5;
        }
        else if (componentCode.startsWith('HRA')) {
            value = inputs['ctc'] * 0.2;
        }
        else if (componentCode.startsWith('PF')) {
            value = inputs['ctc'] * 0.05;
        }
        return { value, hash };
    }
};
exports.PayrollFormulaEngine = PayrollFormulaEngine;
exports.PayrollFormulaEngine = PayrollFormulaEngine = PayrollFormulaEngine_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollFormulaEngine);
//# sourceMappingURL=payroll-formula.engine.js.map