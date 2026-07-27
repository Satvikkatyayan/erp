"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelCompletedHandler = exports.TravelApprovedHandler = void 0;
const common_1 = require("@nestjs/common");
let TravelApprovedHandler = class TravelApprovedHandler {
    async handle(event) {
    }
};
exports.TravelApprovedHandler = TravelApprovedHandler;
exports.TravelApprovedHandler = TravelApprovedHandler = __decorate([
    (0, common_1.Injectable)()
], TravelApprovedHandler);
let TravelCompletedHandler = class TravelCompletedHandler {
    async handle(event) {
    }
};
exports.TravelCompletedHandler = TravelCompletedHandler;
exports.TravelCompletedHandler = TravelCompletedHandler = __decorate([
    (0, common_1.Injectable)()
], TravelCompletedHandler);
//# sourceMappingURL=travel.handlers.js.map