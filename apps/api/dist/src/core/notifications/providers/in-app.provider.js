"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InAppProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppProvider = void 0;
const common_1 = require("@nestjs/common");
let InAppProvider = InAppProvider_1 = class InAppProvider {
    constructor() {
        this.logger = new common_1.Logger(InAppProvider_1.name);
    }
    async send(payload) {
        this.logger.log(`Sending In-App Notification to ${payload.recipientId}`);
        return true;
    }
};
exports.InAppProvider = InAppProvider;
exports.InAppProvider = InAppProvider = InAppProvider_1 = __decorate([
    (0, common_1.Injectable)()
], InAppProvider);
//# sourceMappingURL=in-app.provider.js.map