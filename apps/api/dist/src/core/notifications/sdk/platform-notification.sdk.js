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
var PlatformNotificationSDK_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformNotificationSDK = void 0;
const common_1 = require("@nestjs/common");
const routing_resolver_service_1 = require("../routing/routing-resolver.service");
let PlatformNotificationSDK = PlatformNotificationSDK_1 = class PlatformNotificationSDK {
    constructor(router) {
        this.router = router;
        this.logger = new common_1.Logger(PlatformNotificationSDK_1.name);
    }
    async send(eventKey, payload) {
        const recipients = this.router.resolveRecipients(eventKey, payload);
        this.logger.log(`Queueing Notification for [${eventKey}] -> ${recipients.join(', ')}`);
        return { status: 'QUEUED', recipients };
    }
    async broadcast(eventKey, payload, recipients) {
        this.logger.log(`Broadcasting Notification to ${recipients.length} recipients`);
        return { status: 'BATCH_QUEUED', count: recipients.length };
    }
};
exports.PlatformNotificationSDK = PlatformNotificationSDK;
exports.PlatformNotificationSDK = PlatformNotificationSDK = PlatformNotificationSDK_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [routing_resolver_service_1.RoutingResolverService])
], PlatformNotificationSDK);
//# sourceMappingURL=platform-notification.sdk.js.map