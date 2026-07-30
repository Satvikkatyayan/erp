"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservabilityModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const telemetry_service_1 = require("./services/telemetry.service");
const trace_context_service_1 = require("./context/trace-context.service");
const delivery_lifecycle_observer_1 = require("./observers/delivery-lifecycle.observer");
let ObservabilityModule = class ObservabilityModule {
};
exports.ObservabilityModule = ObservabilityModule;
exports.ObservabilityModule = ObservabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            {
                provide: 'TelemetryInterface',
                useClass: telemetry_service_1.TelemetryService
            },
            trace_context_service_1.TraceContextService,
            delivery_lifecycle_observer_1.DeliveryLifecycleObserver
        ],
        exports: ['TelemetryInterface', trace_context_service_1.TraceContextService]
    })
], ObservabilityModule);
//# sourceMappingURL=observability.module.js.map