"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const request_context_service_1 = require("./request-context.service");
const correlation_id_middleware_1 = require("./correlation-id.middleware");
const context_factory_1 = require("./context.factory");
let ContextModule = class ContextModule {
    configure(consumer) {
        consumer.apply(correlation_id_middleware_1.CorrelationIdMiddleware).forRoutes('*');
    }
};
exports.ContextModule = ContextModule;
exports.ContextModule = ContextModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: { mount: false },
            }),
        ],
        providers: [request_context_service_1.RequestContextService, context_factory_1.ContextFactory],
        exports: [request_context_service_1.RequestContextService, context_factory_1.ContextFactory],
    })
], ContextModule);
//# sourceMappingURL=context.module.js.map