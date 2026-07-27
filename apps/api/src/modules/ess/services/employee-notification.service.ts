import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeNotificationService {
  private readonly logger = new Logger(EmployeeNotificationService.name);

  constructor() {}

  async getUnreadNotifications(ctx: PlatformContext) {
    return [];
  }
}
