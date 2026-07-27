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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTableEngine = void 0;
const common_1 = require("@nestjs/common");
const json_ast_evaluator_service_1 = require("../../workflow/evaluator/json-ast-evaluator.service");
let DecisionTableEngine = class DecisionTableEngine {
    constructor(ast) {
        this.ast = ast;
    }
    evaluate(tableDefinition, context, hitPolicy = 'FIRST_MATCH') {
        const trace = [];
        const matchedRows = [];
        for (const row of tableDefinition.rows || []) {
            const isMatch = this.ast.evaluate(row.conditions, context);
            trace.push({ rowId: row.id, matched: isMatch, evaluatedConditions: row.conditions });
            if (isMatch) {
                matchedRows.push(row);
                if (hitPolicy === 'FIRST_MATCH') {
                    break;
                }
            }
        }
        if (hitPolicy === 'UNIQUE' && matchedRows.length > 1) {
            throw new common_1.ConflictException('UNIQUE hit policy violated: Multiple rules matched.');
        }
        const outputs = {};
        if (hitPolicy === 'COLLECT') {
            matchedRows.forEach(r => {
                Object.keys(r.outputs).forEach(k => {
                    if (!outputs[k])
                        outputs[k] = [];
                    outputs[k].push(r.outputs[k]);
                });
            });
        }
        else {
            matchedRows.forEach(r => Object.assign(outputs, r.outputs));
        }
        return { outputs, trace, matchedRows };
    }
};
exports.DecisionTableEngine = DecisionTableEngine;
exports.DecisionTableEngine = DecisionTableEngine = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_ast_evaluator_service_1.JsonAstEvaluator])
], DecisionTableEngine);
//# sourceMappingURL=decision-table.engine.js.map