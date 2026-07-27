"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthAggregator = void 0;
const common_1 = require("@nestjs/common");
const health_contracts_1 = require("./health.contracts");
let HealthAggregator = class HealthAggregator {
    constructor() {
        this.contributors = [];
    }
    register(contributor) {
        this.contributors.push(contributor);
    }
    async getAggregateHealth() {
        const components = {};
        let overallStatus = health_contracts_1.HealthStatus.UP;
        for (const contributor of this.contributors) {
            try {
                const report = await contributor.checkHealth();
                components[contributor.name] = report;
                if (report.status === health_contracts_1.HealthStatus.DOWN)
                    overallStatus = health_contracts_1.HealthStatus.DOWN;
                if (report.status === health_contracts_1.HealthStatus.DEGRADED && overallStatus !== health_contracts_1.HealthStatus.DOWN)
                    overallStatus = health_contracts_1.HealthStatus.DEGRADED;
            }
            catch (err) {
                components[contributor.name] = {
                    status: health_contracts_1.HealthStatus.DOWN,
                    error: err.message,
                    timestamp: new Date()
                };
                overallStatus = health_contracts_1.HealthStatus.DOWN;
            }
        }
        return { status: overallStatus, components };
    }
};
exports.HealthAggregator = HealthAggregator;
exports.HealthAggregator = HealthAggregator = __decorate([
    (0, common_1.Injectable)()
], HealthAggregator);
//# sourceMappingURL=health.aggregator.js.map