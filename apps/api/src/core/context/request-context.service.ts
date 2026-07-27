import { Injectable } from '@nestjs/common';
import { ClsService, ClsStore } from 'nestjs-cls';

import { Context } from './context.interface';

export interface RequestContext extends ClsStore, Context {
  branchId?: string;
  employeeId?: string;
  timezone?: string;
  locale?: string;
}

@Injectable()
export class RequestContextService {
  constructor(private readonly cls: ClsService<RequestContext>) {}

  get userId() { return this.cls.get('userId'); }
  get organizationId() { return this.cls.get('organizationId'); }
  get branchId() { return this.cls.get('branchId'); }
  get employeeId() { return this.cls.get('employeeId'); }
  get timezone() { return this.cls.get('timezone'); }
  get locale() { return this.cls.get('locale'); }
  get correlationId() { return this.cls.get('correlationId'); }
  get requestId() { return this.cls.get('requestId'); }

  setContext(key: keyof RequestContext, value: string) {
    this.cls.set(key, value);
  }
}