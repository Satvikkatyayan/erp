"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireDataScope = exports.DATA_SCOPE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.DATA_SCOPE_KEY = 'dataScope';
const RequireDataScope = (module) => (0, common_1.SetMetadata)(exports.DATA_SCOPE_KEY, module);
exports.RequireDataScope = RequireDataScope;
//# sourceMappingURL=data-scope.decorator.js.map