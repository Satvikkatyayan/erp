import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { EmployeeFacade } from '../facades/employee.facade';

@Injectable()
export class EmployeeProfileService {
  private readonly logger = new Logger(EmployeeProfileService.name);

  constructor(
    private readonly facade: EmployeeFacade
  ) {}

  async getProfile(ctx: PlatformContext) {
    return this.facade.getEmployeeProfile(ctx);
  }
}
