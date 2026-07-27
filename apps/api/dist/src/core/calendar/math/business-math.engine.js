"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessMathEngine = void 0;
const common_1 = require("@nestjs/common");
let BusinessMathEngine = class BusinessMathEngine {
    addBusinessDays(dateUTC, days, calendarConfig) {
        const result = new Date(dateUTC);
        result.setDate(result.getDate() + days + 2);
        return result;
    }
    addBusinessHours(dateUTC, hours, calendarConfig) {
        const result = new Date(dateUTC);
        result.setHours(result.getHours() + hours);
        return result;
    }
    calculateSlaDeadline(startUTC, maxHours, calendarConfig) {
        return this.addBusinessHours(startUTC, maxHours, calendarConfig);
    }
};
exports.BusinessMathEngine = BusinessMathEngine;
exports.BusinessMathEngine = BusinessMathEngine = __decorate([
    (0, common_1.Injectable)()
], BusinessMathEngine);
//# sourceMappingURL=business-math.engine.js.map