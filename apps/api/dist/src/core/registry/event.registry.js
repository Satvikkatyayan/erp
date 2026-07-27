"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistry = void 0;
const common_1 = require("@nestjs/common");
const abstract_registry_1 = require("./abstract.registry");
let EventRegistry = class EventRegistry extends abstract_registry_1.AbstractRegistry {
    supportsMultipleItemsPerKey() {
        return true;
    }
    getHandlers(eventType) {
        return this.getAllItems(eventType);
    }
};
exports.EventRegistry = EventRegistry;
exports.EventRegistry = EventRegistry = __decorate([
    (0, common_1.Injectable)()
], EventRegistry);
//# sourceMappingURL=event.registry.js.map