"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PlatformExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const platform_error_1 = require("../../core/contracts/errors/platform.error");
let PlatformExceptionFilter = PlatformExceptionFilter_1 = class PlatformExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(PlatformExceptionFilter_1.name);
    }
    catch(exception, host) {
        const statusCode = this.mapErrorCodeToStatus(exception);
        this.logger.error(`PlatformError [HTTP ${statusCode}] ${exception.message} (CorrelationID: ${exception.correlationId})`);
        const payload = {
            statusCode,
            code: exception.code,
            message: exception.message,
            correlationId: exception.correlationId,
            timestamp: new Date().toISOString()
        };
        return payload;
    }
    mapErrorCodeToStatus(exception) {
        if (exception instanceof platform_error_1.ValidationError)
            return 400;
        if (exception instanceof platform_error_1.AuthorizationError)
            return 403;
        return 500;
    }
};
exports.PlatformExceptionFilter = PlatformExceptionFilter;
exports.PlatformExceptionFilter = PlatformExceptionFilter = PlatformExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(platform_error_1.PlatformError)
], PlatformExceptionFilter);
//# sourceMappingURL=platform-exception.filter.js.map