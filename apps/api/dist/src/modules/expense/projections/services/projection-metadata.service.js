"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectionMetadataService = void 0;
const common_1 = require("@nestjs/common");
let ProjectionMetadataService = class ProjectionMetadataService {
    async getProjectionVersion(projectionId) {
        return 0;
    }
    async getReplayTimestamp(projectionId) {
        return null;
    }
    async getRebuildStatus(projectionId) {
        return 'IDLE';
    }
    async getLastProcessedEvent(projectionId) {
        return null;
    }
    async getProjectionStatistics(projectionId) {
        return {};
    }
};
exports.ProjectionMetadataService = ProjectionMetadataService;
exports.ProjectionMetadataService = ProjectionMetadataService = __decorate([
    (0, common_1.Injectable)()
], ProjectionMetadataService);
//# sourceMappingURL=projection-metadata.service.js.map