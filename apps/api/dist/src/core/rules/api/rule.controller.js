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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleController = void 0;
const common_1 = require("@nestjs/common");
const platform_rule_sdk_1 = require("../sdk/platform-rule.sdk");
const rule_analyzer_service_1 = require("../analysis/rule-analyzer.service");
let RuleController = class RuleController {
    constructor(sdk, analyzer) {
        this.sdk = sdk;
        this.analyzer = analyzer;
    }
    async evaluate(key, payload) {
        return this.sdk.evaluate(key, payload);
    }
    async simulate(key, payload) {
        return this.sdk.simulate(key, payload);
    }
    async getImpact(id) {
        return this.analyzer.analyzeImpact(id);
    }
};
exports.RuleController = RuleController;
__decorate([
    (0, common_1.Post)('evaluate/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RuleController.prototype, "evaluate", null);
__decorate([
    (0, common_1.Post)('simulate/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RuleController.prototype, "simulate", null);
__decorate([
    (0, common_1.Get)(':id/impact'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuleController.prototype, "getImpact", null);
exports.RuleController = RuleController = __decorate([
    (0, common_1.Controller)('api/v1/rules'),
    __metadata("design:paramtypes", [platform_rule_sdk_1.PlatformRuleSDK,
        rule_analyzer_service_1.RuleAnalyzerService])
], RuleController);
//# sourceMappingURL=rule.controller.js.map