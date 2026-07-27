"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RuleEvaluationAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEvaluationAdapter = void 0;
const common_1 = require("@nestjs/common");
let RuleEvaluationAdapter = RuleEvaluationAdapter_1 = class RuleEvaluationAdapter {
    constructor() {
        this.logger = new common_1.Logger(RuleEvaluationAdapter_1.name);
    }
    async evaluate(ast, payload) {
        this.logger.debug('Translating Form AST to Stage 2 Business Rules Engine payload...');
        if (ast.operation === 'MULTIPLY') {
            return (payload[ast.fields[0]] || 0) * ast.multiplier;
        }
        if (ast.operation === 'EQUALS') {
            return payload[ast.field] === ast.value;
        }
        return false;
    }
};
exports.RuleEvaluationAdapter = RuleEvaluationAdapter;
exports.RuleEvaluationAdapter = RuleEvaluationAdapter = RuleEvaluationAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], RuleEvaluationAdapter);
//# sourceMappingURL=rule-evaluation-adapter.js.map