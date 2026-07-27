"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectionRegistry = void 0;
const common_1 = require("@nestjs/common");
let ProjectionRegistry = class ProjectionRegistry {
    constructor() {
        this.handlers = new Set();
    }
    register(handler) {
        this.handlers.add(handler);
    }
    unregister(handler) {
        this.handlers.delete(handler);
    }
    async dispatch(event) {
        const supportedHandlers = this.getProjection(event);
        for (const handler of supportedHandlers) {
            await handler.project(event);
        }
    }
    getProjection(event) {
        return Array.from(this.handlers).filter(handler => handler.supports(event));
    }
    getAll() {
        return Array.from(this.handlers);
    }
};
exports.ProjectionRegistry = ProjectionRegistry;
exports.ProjectionRegistry = ProjectionRegistry = __decorate([
    (0, common_1.Injectable)()
], ProjectionRegistry);
//# sourceMappingURL=projection.registry.js.map