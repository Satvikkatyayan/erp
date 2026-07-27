"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireFeatures = exports.FEATURES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.FEATURES_KEY = 'features';
const RequireFeatures = (...features) => (0, common_1.SetMetadata)(exports.FEATURES_KEY, features);
exports.RequireFeatures = RequireFeatures;
//# sourceMappingURL=require-features.decorator.js.map