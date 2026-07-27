import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ExitLifecycleService } from '../services/exit-lifecycle.service';

@Controller('offboarding')
export class OffboardingController {
  constructor(private readonly lifecycle: ExitLifecycleService) {}
}
