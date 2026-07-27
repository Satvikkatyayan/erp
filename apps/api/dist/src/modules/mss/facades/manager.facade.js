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
var ManagerFacade_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerFacade = void 0;
const common_1 = require("@nestjs/common");
const team_scope_resolver_1 = require("../resolvers/team-scope.resolver");
const manager_team_service_1 = require("../services/manager-team.service");
const manager_dashboard_service_1 = require("../services/manager-dashboard.service");
let ManagerFacade = ManagerFacade_1 = class ManagerFacade {
    constructor(scopeResolver, teamService, dashboardService) {
        this.scopeResolver = scopeResolver;
        this.teamService = teamService;
        this.dashboardService = dashboardService;
        this.logger = new common_1.Logger(ManagerFacade_1.name);
    }
    async getDashboard(ctx) {
        return this.dashboardService.getDashboard(ctx);
    }
    async getTeamDirectory(ctx) {
        const scopeIds = await this.scopeResolver.resolveAuthorizedTeamIds(ctx);
        return this.teamService.getDirectory(ctx, scopeIds);
    }
};
exports.ManagerFacade = ManagerFacade;
exports.ManagerFacade = ManagerFacade = ManagerFacade_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_scope_resolver_1.TeamScopeResolver,
        manager_team_service_1.ManagerTeamService,
        manager_dashboard_service_1.ManagerDashboardService])
], ManagerFacade);
//# sourceMappingURL=manager.facade.js.map