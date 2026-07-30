"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const error_codes_1 = require("../../core/errors/error-codes");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const requestId = request.context?.correlationId || 'unknown-request-id';
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let code = error_codes_1.ErrorCodes.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let details = undefined;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const responsePayload = exception.getResponse();
            message = typeof responsePayload === 'string' ? responsePayload : (responsePayload.message || 'Error');
            details = responsePayload.message && Array.isArray(responsePayload.message) ? responsePayload.message : undefined;
            if (status === common_1.HttpStatus.BAD_REQUEST)
                code = error_codes_1.ErrorCodes.VALIDATION_ERROR;
            else if (status === common_1.HttpStatus.NOT_FOUND)
                code = error_codes_1.ErrorCodes.RESOURCE_NOT_FOUND;
            else if (status === common_1.HttpStatus.FORBIDDEN || status === common_1.HttpStatus.UNAUTHORIZED)
                code = error_codes_1.ErrorCodes.ACCESS_DENIED;
            else
                code = error_codes_1.ErrorCodes.BAD_REQUEST;
            if (responsePayload.error && typeof responsePayload.error === 'string') {
                code = responsePayload.error;
            }
        }
        else if (exception?.code?.startsWith('P')) {
            if (exception.code === 'P2002') {
                status = common_1.HttpStatus.CONFLICT;
                code = error_codes_1.ErrorCodes.DATABASE_CONFLICT;
                message = 'A record with this value already exists.';
            }
            else if (exception.code === 'P2025') {
                status = common_1.HttpStatus.NOT_FOUND;
                code = error_codes_1.ErrorCodes.RECORD_NOT_FOUND;
                message = 'The requested record was not found.';
            }
            else if (exception.code === 'P2003') {
                status = common_1.HttpStatus.CONFLICT;
                code = error_codes_1.ErrorCodes.FOREIGN_KEY_VIOLATION;
                message = 'Related record does not exist or cannot be deleted.';
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        response.status(status).json({
            success: false,
            error: {
                code,
                message,
                details
            },
            timestamp: new Date().toISOString(),
            requestId
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map