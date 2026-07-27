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
exports.StructuredLogger = void 0;
const common_1 = require("@nestjs/common");
const request_context_service_1 = require("../context/request-context.service");
let StructuredLogger = class StructuredLogger extends common_1.ConsoleLogger {
    constructor(contextService) {
        super();
        this.contextService = contextService;
    }
    log(message, ...optionalParams) {
        super.log(this.formatLogMessage(message), ...optionalParams);
    }
    error(message, ...optionalParams) {
        super.error(this.formatLogMessage(message), ...optionalParams);
    }
    warn(message, ...optionalParams) {
        super.warn(this.formatLogMessage(message), ...optionalParams);
    }
    debug(message, ...optionalParams) {
        super.debug(this.formatLogMessage(message), ...optionalParams);
    }
    verbose(message, ...optionalParams) {
        super.verbose(this.formatLogMessage(message), ...optionalParams);
    }
    formatLogMessage(message) {
        const correlationId = this.contextService.correlationId;
        const prefix = correlationId ? `[CorrID: ${correlationId}]` : '';
        return `${prefix} ${typeof message === 'object' ? JSON.stringify(message) : message}`;
    }
};
exports.StructuredLogger = StructuredLogger;
exports.StructuredLogger = StructuredLogger = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [request_context_service_1.RequestContextService])
], StructuredLogger);
//# sourceMappingURL=structured-logger.service.js.map