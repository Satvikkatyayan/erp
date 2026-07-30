"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderMapper = void 0;
const common_1 = require("@nestjs/common");
let RenderMapper = class RenderMapper {
    mapToResponseDto(result) {
        return {
            renderedSubject: result.renderedSubject,
            renderedBody: result.renderedBody,
            templateVersionId: result.templateVersionId,
            renderingWarnings: result.renderingWarnings,
        };
    }
    success(data, message = 'Success') {
        return {
            success: true,
            message,
            data,
        };
    }
};
exports.RenderMapper = RenderMapper;
exports.RenderMapper = RenderMapper = __decorate([
    (0, common_1.Injectable)()
], RenderMapper);
//# sourceMappingURL=render.mapper.js.map