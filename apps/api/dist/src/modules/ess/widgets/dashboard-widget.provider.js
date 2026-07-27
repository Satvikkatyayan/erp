"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DashboardWidgetProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardWidgetProvider = void 0;
const common_1 = require("@nestjs/common");
let DashboardWidgetProvider = DashboardWidgetProvider_1 = class DashboardWidgetProvider {
    constructor() {
        this.logger = new common_1.Logger(DashboardWidgetProvider_1.name);
        this.widgets = new Map();
    }
    registerWidget(widget) {
        this.widgets.set(widget.widgetKey, widget);
        this.logger.debug(`Registered widget ${widget.widgetKey}`);
    }
    async getWidgetData(ctx, widgetKey) {
        const widget = this.widgets.get(widgetKey);
        if (!widget)
            return null;
        return widget.getData(ctx);
    }
    getAvailableWidgets() {
        return Array.from(this.widgets.keys());
    }
};
exports.DashboardWidgetProvider = DashboardWidgetProvider;
exports.DashboardWidgetProvider = DashboardWidgetProvider = DashboardWidgetProvider_1 = __decorate([
    (0, common_1.Injectable)()
], DashboardWidgetProvider);
//# sourceMappingURL=dashboard-widget.provider.js.map