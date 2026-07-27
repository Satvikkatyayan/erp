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
exports.TeamSummaryWidget = void 0;
const common_1 = require("@nestjs/common");
const dashboard_widget_registry_1 = require("./dashboard-widget.registry");
const team_scope_resolver_1 = require("../resolvers/team-scope.resolver");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TeamSummaryWidget = class TeamSummaryWidget {
    get key() { return 'TeamSummary'; }
    constructor(registry, scopeResolver, prisma) {
        this.registry = registry;
        this.scopeResolver = scopeResolver;
        this.prisma = prisma;
        this.registry.register(this);
    }
    async render(ctx, config) {
        const scopeIds = await this.scopeResolver.resolveAuthorizedTeamIds(ctx);
        const headcount = scopeIds.length;
        return {
            title: "Team Overview",
            headcount,
            presentToday: headcount,
            onLeave: 0
        };
    }
};
exports.TeamSummaryWidget = TeamSummaryWidget;
exports.TeamSummaryWidget = TeamSummaryWidget = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_widget_registry_1.DashboardWidgetRegistry,
        team_scope_resolver_1.TeamScopeResolver,
        prisma_service_1.PrismaService])
], TeamSummaryWidget);
//# sourceMappingURL=team-summary.widget.js.map