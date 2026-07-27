"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceFilter = void 0;
const common_1 = require("@nestjs/common");
let PreferenceFilter = class PreferenceFilter {
    shouldSuppress(channel, priority, userPreferences) {
        if (priority === 'CRITICAL')
            return false;
        if (userPreferences?.mutedChannels?.includes(channel))
            return true;
        const isQuietHours = userPreferences?.inQuietHours === true;
        if (isQuietHours)
            return true;
        return false;
    }
};
exports.PreferenceFilter = PreferenceFilter;
exports.PreferenceFilter = PreferenceFilter = __decorate([
    (0, common_1.Injectable)()
], PreferenceFilter);
//# sourceMappingURL=preference.filter.js.map