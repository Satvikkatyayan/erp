"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NodemailerProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerProvider = void 0;
const common_1 = require("@nestjs/common");
let NodemailerProvider = NodemailerProvider_1 = class NodemailerProvider {
    constructor() {
        this.logger = new common_1.Logger(NodemailerProvider_1.name);
    }
    async send(payload) {
        this.logger.log(`Sending Email via Nodemailer to ${payload.recipientId}`);
        if (payload.recipientId === 'FAIL_ME') {
            throw new Error('SMTP Connection Refused (Mocked Failure)');
        }
        return true;
    }
};
exports.NodemailerProvider = NodemailerProvider;
exports.NodemailerProvider = NodemailerProvider = NodemailerProvider_1 = __decorate([
    (0, common_1.Injectable)()
], NodemailerProvider);
//# sourceMappingURL=nodemailer.provider.js.map