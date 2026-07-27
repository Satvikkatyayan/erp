"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RESTConnector_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTConnector = void 0;
const common_1 = require("@nestjs/common");
let RESTConnector = RESTConnector_1 = class RESTConnector {
    constructor() {
        this.id = 'REST_V1';
        this.version = '1.0.0';
        this.logger = new common_1.Logger(RESTConnector_1.name);
    }
    async initialize() { this.logger.debug('REST Connector Initialized'); }
    validateConfiguration(config) { return !!config.url; }
    async testConnection(config) { return true; }
    async healthCheck() {
        return "HEALTHY";
    }
    async send(payload, config, credentials) {
        this.logger.log(`Sending payload to ${config.url} via REST... Auth: Bearer ${credentials}`);
        if (config.url.includes('fail')) {
            throw new Error('503 Service Unavailable');
        }
        return { status: 200, data: { success: true } };
    }
    async disconnect() { }
    async shutdown() { }
};
exports.RESTConnector = RESTConnector;
exports.RESTConnector = RESTConnector = RESTConnector_1 = __decorate([
    (0, common_1.Injectable)()
], RESTConnector);
//# sourceMappingURL=rest.connector.js.map