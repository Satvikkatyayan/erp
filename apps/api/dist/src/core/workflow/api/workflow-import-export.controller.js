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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowImportExportController = void 0;
const common_1 = require("@nestjs/common");
let WorkflowImportExportController = class WorkflowImportExportController {
    async export(id) {
        return {
            workflowHash: 'mock-hash-123',
            definition: { id, states: [] }
        };
    }
    async import(payload) {
        return {
            status: 'Import Successful',
            importedId: 'new-uuid-456',
            hashVerified: true
        };
    }
};
exports.WorkflowImportExportController = WorkflowImportExportController;
__decorate([
    (0, common_1.Get)(':id/export'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowImportExportController.prototype, "export", null);
__decorate([
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkflowImportExportController.prototype, "import", null);
exports.WorkflowImportExportController = WorkflowImportExportController = __decorate([
    (0, common_1.Controller)('api/v1/workflows')
], WorkflowImportExportController);
//# sourceMappingURL=workflow-import-export.controller.js.map