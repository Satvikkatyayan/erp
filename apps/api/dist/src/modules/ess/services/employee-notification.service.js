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
var EmployeeNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeNotificationService = void 0;
const common_1 = require("@nestjs/common");
let EmployeeNotificationService = EmployeeNotificationService_1 = class EmployeeNotificationService {
    constructor() {
        this.logger = new common_1.Logger(EmployeeNotificationService_1.name);
    }
    async getUnreadNotifications(ctx) {
        return [];
    }
};
exports.EmployeeNotificationService = EmployeeNotificationService;
exports.EmployeeNotificationService = EmployeeNotificationService = EmployeeNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmployeeNotificationService);
//# sourceMappingURL=employee-notification.service.js.map