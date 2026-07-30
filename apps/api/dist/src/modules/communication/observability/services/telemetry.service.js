"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TelemetryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryService = void 0;
const common_1 = require("@nestjs/common");
let TelemetryService = TelemetryService_1 = class TelemetryService {
    constructor() {
        this.logger = new common_1.Logger(TelemetryService_1.name);
    }
    incrementCounter(name, value, tags) {
        this.logger.log(`[Metric: Counter] ${name} += ${value} | Tags: ${JSON.stringify(tags || {})}`);
    }
    recordHistogram(name, value, tags) {
        this.logger.log(`[Metric: Histogram] ${name} = ${value} | Tags: ${JSON.stringify(tags || {})}`);
    }
    logInfo(message, context) {
        const safeContext = this.redactPii(context);
        this.logger.log(`${message} | Context: ${JSON.stringify(safeContext)}`);
    }
    logError(message, error, context) {
        const safeContext = this.redactPii(context);
        this.logger.error(`${message} | Context: ${JSON.stringify(safeContext)}`, error?.stack);
    }
    redactPii(context) {
        if (!context)
            return {};
        const redacted = { ...context };
        if (redacted.recipient) {
            redacted.recipient = '***REDACTED***';
        }
        return redacted;
    }
};
exports.TelemetryService = TelemetryService;
exports.TelemetryService = TelemetryService = TelemetryService_1 = __decorate([
    (0, common_1.Injectable)()
], TelemetryService);
//# sourceMappingURL=telemetry.service.js.map