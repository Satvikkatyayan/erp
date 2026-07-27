"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizationPlugin = void 0;
const common_1 = require("@nestjs/common");
let NormalizationPlugin = class NormalizationPlugin {
    constructor() {
        this.name = 'Normalization';
        this.order = 90;
    }
    isApplicable(_ctx) {
        return true;
    }
    async evaluate(ctx) {
        const rawTotal = ctx.snapshotData?._cumulativeWeightedTotal ?? 0;
        const strategy = ctx.cycleConfig?.normalizationStrategy ?? 'Linear';
        let normalizedScore;
        switch (strategy) {
            case 'BellCurve':
                normalizedScore = this.applyBellCurve(rawTotal);
                break;
            case 'MinMax':
                normalizedScore = this.applyMinMax(rawTotal, ctx.cycleConfig?.minScore ?? 0, ctx.cycleConfig?.maxScore ?? 100);
                break;
            case 'Linear':
            default:
                normalizedScore = Math.min(Math.max(rawTotal, 0), 100);
                break;
        }
        return {
            component: this.name,
            rawScore: rawTotal,
            weight: 1,
            weightedScore: normalizedScore,
            metadata: { strategy, preNormalization: rawTotal, postNormalization: normalizedScore },
        };
    }
    applyBellCurve(score) {
        const midpoint = 50;
        const steepness = 0.1;
        const sigmoid = 100 / (1 + Math.exp(-steepness * (score - midpoint)));
        return Math.round(sigmoid * 100) / 100;
    }
    applyMinMax(score, min, max) {
        if (max <= min)
            return score;
        return Math.min(Math.max(((score - min) / (max - min)) * 100, 0), 100);
    }
};
exports.NormalizationPlugin = NormalizationPlugin;
exports.NormalizationPlugin = NormalizationPlugin = __decorate([
    (0, common_1.Injectable)()
], NormalizationPlugin);
//# sourceMappingURL=normalization.plugin.js.map