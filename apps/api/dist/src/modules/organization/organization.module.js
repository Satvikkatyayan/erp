"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const department_hierarchy_service_1 = require("./services/department-hierarchy.service");
const organization_bootstrap_service_1 = require("./bootstrap/organization-bootstrap.service");
const organization_query_service_1 = require("./services/organization-query.service");
let OrganizationModule = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule;
exports.OrganizationModule = OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [
            department_hierarchy_service_1.DepartmentHierarchyService,
            organization_bootstrap_service_1.OrganizationBootstrapService,
            organization_query_service_1.OrganizationQueryService
        ],
        exports: [department_hierarchy_service_1.DepartmentHierarchyService, organization_bootstrap_service_1.OrganizationBootstrapService, organization_query_service_1.OrganizationQueryService]
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map