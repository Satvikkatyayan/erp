import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';
import { RequestContext } from './request-context.service';
export declare class CorrelationIdMiddleware implements NestMiddleware {
    private readonly cls;
    constructor(cls: ClsService<RequestContext>);
    use(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=correlation-id.middleware.d.ts.map