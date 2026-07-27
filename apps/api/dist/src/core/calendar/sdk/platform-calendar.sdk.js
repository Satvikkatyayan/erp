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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformCalendarSDK = void 0;
const common_1 = require("@nestjs/common");
const calendar_resolver_service_1 = require("../resolution/calendar-resolver.service");
const business_math_engine_1 = require("../math/business-math.engine");
let PlatformCalendarSDK = class PlatformCalendarSDK {
    constructor(resolver, math) {
        this.resolver = resolver;
        this.math = math;
    }
    addBusinessDays(userId, dateUTC, days) {
        const cal = this.resolver.resolveCalendar(userId);
        return this.math.addBusinessDays(dateUTC, days, cal);
    }
    calculateSLA(userId, startUTC, maxHours) {
        const cal = this.resolver.resolveCalendar(userId);
        return this.math.calculateSlaDeadline(startUTC, maxHours, cal);
    }
};
exports.PlatformCalendarSDK = PlatformCalendarSDK;
exports.PlatformCalendarSDK = PlatformCalendarSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [calendar_resolver_service_1.CalendarResolverService,
        business_math_engine_1.BusinessMathEngine])
], PlatformCalendarSDK);
//# sourceMappingURL=platform-calendar.sdk.js.map