"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusScoringPlugin = void 0;
const common_1 = require("@nestjs/common");
let BonusScoringPlugin = class BonusScoringPlugin {
    constructor() {
        this.name = 'BonusRecommendation';
        this.order = 100;
    }
    isApplicable(ctx) {
        return ctx.cycleConfig?.enableBonusRecommendation === true;
    }
    async evaluate(ctx) {
        const normalizedScore = ctx.snapshotData?._normalizedScore ?? 0;
        const bonusPct = this.calculateBonusTier(normalizedScore);
        return {
            component: this.name,
            rawScore: normalizedScore,
            weight: 0,
            weightedScore: 0,
            metadata: {
                recommendedBonusPct: bonusPct,
                basedOnScore: normalizedScore,
                tier: this.getTierLabel(normalizedScore),
            },
        };
    }
    calculateBonusTier(score) {
        if (score >= 90)
            return 20;
        if (score >= 80)
            return 15;
        if (score >= 70)
            return 10;
        if (score >= 60)
            return 5;
        return 0;
    }
    getTierLabel(score) {
        if (score >= 90)
            return 'Exceptional';
        if (score >= 80)
            return 'Exceeds Expectations';
        if (score >= 70)
            return 'Meets Expectations';
        if (score >= 60)
            return 'Needs Improvement';
        return 'Below Expectations';
    }
};
exports.BonusScoringPlugin = BonusScoringPlugin;
exports.BonusScoringPlugin = BonusScoringPlugin = __decorate([
    (0, common_1.Injectable)()
], BonusScoringPlugin);
//# sourceMappingURL=bonus-scoring.plugin.js.map