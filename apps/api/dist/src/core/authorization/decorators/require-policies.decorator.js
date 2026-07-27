"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePolicies = exports.POLICIES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.POLICIES_KEY = 'policies';
const RequirePolicies = (...policies) => (0, common_1.SetMetadata)(exports.POLICIES_KEY, policies);
exports.RequirePolicies = RequirePolicies;
//# sourceMappingURL=require-policies.decorator.js.map