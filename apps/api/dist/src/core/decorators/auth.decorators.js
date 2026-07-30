"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = exports.RequestContext = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
exports.RequestContext = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.context;
});
const Policy = (...policies) => (0, common_1.SetMetadata)('policies', policies);
exports.Policy = Policy;
//# sourceMappingURL=auth.decorators.js.map