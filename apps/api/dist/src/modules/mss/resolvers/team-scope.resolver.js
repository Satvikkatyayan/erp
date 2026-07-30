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
var TeamScopeResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamScopeResolver = void 0;
const common_1 = require("@nestjs/common");
const platform_employee_sdk_1 = require("../../employee/sdk/platform-employee.sdk");
let TeamScopeResolver = TeamScopeResolver_1 = class TeamScopeResolver {
    constructor(employeeSdk) {
        this.employeeSdk = employeeSdk;
        this.logger = new common_1.Logger(TeamScopeResolver_1.name);
    }
    async resolveAuthorizedTeamIds(ctx) {
        const allowIndirect = ctx.featureFlags['MSS_ALLOW_INDIRECT'] !== false;
        const maxDepth = allowIndirect ? 5 : 1;
        return this.employeeSdk.getTeamScopeIds(ctx, ctx.employeeId, allowIndirect, maxDepth);
    }
    async validateAccess(ctx, targetEmployeeId) {
        const scopeIds = await this.resolveAuthorizedTeamIds(ctx);
        if (!scopeIds.includes(targetEmployeeId) && ctx.employeeId !== targetEmployeeId) {
            throw new common_1.ForbiddenException('You are not authorized to access this employee\'s data.');
        }
    }
};
exports.TeamScopeResolver = TeamScopeResolver;
exports.TeamScopeResolver = TeamScopeResolver = TeamScopeResolver_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [platform_employee_sdk_1.PlatformEmployeeSDK])
], TeamScopeResolver);
//# sourceMappingURL=team-scope.resolver.js.map