"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectionHealthService = void 0;
const common_1 = require("@nestjs/common");
let ProjectionHealthService = class ProjectionHealthService {
    async getLag() {
        return 0;
    }
    async getFailedEventsCount() {
        return 0;
    }
    async getReplayProgress() {
        return 100;
    }
    async getStaleProjections() {
        return [];
    }
    async getCacheAge() {
        return 0;
    }
    async getProcessingThroughput() {
        return 0;
    }
    async getAverageRebuildDuration() {
        return 0;
    }
    async getQueueDepth() {
        return 0;
    }
};
exports.ProjectionHealthService = ProjectionHealthService;
exports.ProjectionHealthService = ProjectionHealthService = __decorate([
    (0, common_1.Injectable)()
], ProjectionHealthService);
//# sourceMappingURL=projection-health.service.js.map