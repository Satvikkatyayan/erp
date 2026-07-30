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
exports.JoinEmployeeHandler = void 0;
const common_1 = require("@nestjs/common");
const employee_execution_service_1 = require("../../services/employee-execution.service");
const platform_event_publisher_service_1 = require("../../../../core/events/platform-event-publisher.service");
let JoinEmployeeHandler = class JoinEmployeeHandler {
    constructor(executionService, publisher) {
        this.executionService = executionService;
        this.publisher = publisher;
    }
    async execute(command) {
        const result = await this.executionService.joinEmployee(command);
        for (const event of result.events) {
            this.publisher.publish(event);
        }
    }
};
exports.JoinEmployeeHandler = JoinEmployeeHandler;
exports.JoinEmployeeHandler = JoinEmployeeHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_execution_service_1.EmployeeExecutionService,
        platform_event_publisher_service_1.PlatformEventPublisher])
], JoinEmployeeHandler);
//# sourceMappingURL=join-employee.handler.js.map