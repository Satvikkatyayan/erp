"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
let AppLogger = class AppLogger {
    setContext(context) {
        this.context = context;
    }
    log(message, ...optionalParams) {
        console.log(`[INFO] [${this.context || 'App'}] ${message}`, ...optionalParams);
    }
    error(message, ...optionalParams) {
        console.error(`[ERROR] [${this.context || 'App'}] ${message}`, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        console.warn(`[WARN] [${this.context || 'App'}] ${message}`, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        console.debug(`[DEBUG] [${this.context || 'App'}] ${message}`, ...optionalParams);
    }
    verbose(message, ...optionalParams) {
        console.log(`[VERBOSE] [${this.context || 'App'}] ${message}`, ...optionalParams);
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
], AppLogger);
//# sourceMappingURL=app-logger.service.js.map