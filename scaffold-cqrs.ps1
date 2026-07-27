$commands = @(
    "SubmitAttendance",
    "ValidateAttendance",
    "StartReview",
    "CompleteReview",
    "LockAttendance",
    "RequestCorrection",
    "ApproveCorrection",
    "RejectCorrection",
    "ReopenAttendance"
)

$basePath = "d:\erpvvinfratech\apps\api\src\modules\attendance\commands"
$handlersPath = "$basePath\handlers"
New-Item -ItemType Directory -Force -Path $handlersPath

foreach ($cmd in $commands) {
    $kebab = $cmd -replace '([a-z])([A-Z])', '$1-$2'
    $kebab = $kebab.ToLower()

    $cmdContent = @"
export class $($cmd)Command {
  constructor(
    public readonly musterId: string,
    public readonly actorId: string,
    public readonly actorRoles: string[],
    public readonly correlationId: string,
    public readonly reason?: string
  ) {}
}
"@
    Set-Content -Path "$basePath\$kebab.command.ts" -Value $cmdContent

    $handlerContent = @"
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { $($cmd)Command } from '../$kebab.command';

@Injectable()
export class $($cmd)Handler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService
  ) {}

  async execute(command: $($cmd)Command) {
    return this.prisma.`$transaction(async (tx) => {
      const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
      if (!muster) throw new BadRequestException('Muster not found');

      // TODO: Handler logic
      return muster;
    });
  }
}
"@
    Set-Content -Path "$handlersPath\$kebab.handler.ts" -Value $handlerContent
}
