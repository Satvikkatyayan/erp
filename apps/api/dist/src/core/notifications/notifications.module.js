"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_provider_1 = require("./providers/nodemailer.provider");
const in_app_provider_1 = require("./providers/in-app.provider");
const template_renderer_1 = require("./pipeline/template.renderer");
const preference_filter_1 = require("./pipeline/preference.filter");
const routing_resolver_service_1 = require("./routing/routing-resolver.service");
const platform_notification_sdk_1 = require("./sdk/platform-notification.sdk");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            nodemailer_provider_1.NodemailerProvider,
            in_app_provider_1.InAppProvider,
            template_renderer_1.TemplateRenderer,
            preference_filter_1.PreferenceFilter,
            routing_resolver_service_1.RoutingResolverService,
            platform_notification_sdk_1.PlatformNotificationSDK
        ],
        exports: [platform_notification_sdk_1.PlatformNotificationSDK]
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map