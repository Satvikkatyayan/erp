"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarModule = void 0;
const common_1 = require("@nestjs/common");
const business_math_engine_1 = require("./math/business-math.engine");
const calendar_resolver_service_1 = require("./resolution/calendar-resolver.service");
const platform_calendar_sdk_1 = require("./sdk/platform-calendar.sdk");
let CalendarModule = class CalendarModule {
};
exports.CalendarModule = CalendarModule;
exports.CalendarModule = CalendarModule = __decorate([
    (0, common_1.Module)({
        providers: [
            business_math_engine_1.BusinessMathEngine,
            calendar_resolver_service_1.CalendarResolverService,
            platform_calendar_sdk_1.PlatformCalendarSDK
        ],
        exports: [platform_calendar_sdk_1.PlatformCalendarSDK]
    })
], CalendarModule);
//# sourceMappingURL=calendar.module.js.map