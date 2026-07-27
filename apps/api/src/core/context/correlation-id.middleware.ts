import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ClsService } from 'nestjs-cls';
import { RequestContext } from './request-context.service';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService<RequestContext>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['x-correlation-id'] as string || uuidv4();
    const requestId = uuidv4();
    
    // Pass to response headers
    res.setHeader('X-Correlation-ID', correlationId);
    res.setHeader('X-Request-ID', requestId);

    const tenantId = req.headers['x-tenant-id'] as string || 'default-tenant';
    const organizationId = req.headers['x-organization-id'] as string || 'default-org';

    this.cls.runWith({ correlationId, requestId, tenantId, organizationId }, () => {
        next();
    });
  }
}