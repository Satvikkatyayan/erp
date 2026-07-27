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
var EmployeeProfileService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfileService = void 0;
const common_1 = require("@nestjs/common");
const employee_facade_1 = require("../facades/employee.facade");
let EmployeeProfileService = EmployeeProfileService_1 = class EmployeeProfileService {
    constructor(facade) {
        this.facade = facade;
        this.logger = new common_1.Logger(EmployeeProfileService_1.name);
    }
    async getProfile(ctx) {
        return this.facade.getEmployeeProfile(ctx);
    }
};
exports.EmployeeProfileService = EmployeeProfileService;
exports.EmployeeProfileService = EmployeeProfileService = EmployeeProfileService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_facade_1.EmployeeFacade])
], EmployeeProfileService);
//# sourceMappingURL=employee-profile.service.js.map