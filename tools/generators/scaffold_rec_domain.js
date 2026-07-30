const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps/api/src/modules/recruitment');

const dirs = [
  '',
  'controllers',
  'services',
  'events',
];

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const files = {
  'recruitment.module.ts': `import { Module } from '@nestjs/common';
import { RecruitmentController } from './controllers/recruitment.controller';
import { RecruitmentLifecycleService } from './services/recruitment-lifecycle.service';
import { CandidateService } from './services/candidate.service';
import { InterviewService } from './services/interview.service';
import { OfferService } from './services/offer.service';
import { BackgroundVerificationService } from './services/background-verification.service';
import { RecruitmentValidationService } from './services/recruitment-validation.service';
import { RecruitmentTimelineService } from './services/recruitment-timeline.service';
import { RecruitmentBootstrapService } from './services/recruitment-bootstrap.service';

@Module({
  controllers: [RecruitmentController],
  providers: [
    RecruitmentLifecycleService,
    CandidateService,
    InterviewService,
    OfferService,
    BackgroundVerificationService,
    RecruitmentValidationService,
    RecruitmentTimelineService,
    RecruitmentBootstrapService
  ],
  exports: [RecruitmentLifecycleService]
})
export class RecruitmentModule {}
`,
  'controllers/recruitment.controller.ts': `import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { RecruitmentLifecycleService } from '../services/recruitment-lifecycle.service';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly lifecycle: RecruitmentLifecycleService) {}

  @Post('apply')
  async apply(@Req() req, @Body() payload: any) {
    return this.lifecycle.processApplication(req.context, payload);
  }

  @Post('interviews/:id/schedule')
  async scheduleInterview(@Req() req, @Param('id') id: string, @Body() payload: any) {
    return this.lifecycle.scheduleInterview(req.context, id, payload);
  }

  @Post('offers/:id/accept')
  async acceptOffer(@Req() req, @Param('id') id: string) {
    return this.lifecycle.acceptOffer(req.context, id);
  }
}
`,
  'services/recruitment-validation.service.ts': `import { Injectable } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class RecruitmentValidationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async validateNewCandidate(ctx: PlatformContext, payload: any) {
    // Check for duplicates via Rules Engine
    const ruleResult = await this.sdk.rules.evaluate(ctx, 'CandidateDuplicateCheck', payload);
    if (ruleResult?.isDuplicate) {
       throw new Error('Duplicate candidate detected.');
    }
  }

  async validateHeadcount(ctx: PlatformContext, positionId: string) {
    const position = await this.prisma.recPosition.findUnique({
      where: { id: positionId }
    });
    if (position && position.filled >= position.approvedHeadcount) {
       throw new Error('Position headcount exceeded.');
    }
  }
}
`,
  'services/recruitment-timeline.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class RecruitmentTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async recordEvent(ctx: PlatformContext, applicationId: string, eventType: string, description?: string) {
    await this.prisma.recRecruitmentTimeline.create({
      data: {
        tenantId: ctx.tenantId,
        applicationId,
        eventType,
        description,
        actorId: ctx.userId
      }
    });
  }
}
`,
  'services/candidate.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) {}

  async createCandidate(ctx: PlatformContext, payload: any) {
    return this.prisma.recCandidate.create({
      data: {
        tenantId: ctx.tenantId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone
      }
    });
  }
}
`,
  'services/interview.service.ts': `import { Injectable } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class InterviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async submitFeedback(ctx: PlatformContext, interviewId: string, formPayload: any) {
    const formResult = await this.sdk.forms.submit(ctx, formPayload);
    
    await this.prisma.recInterviewFeedback.create({
      data: {
        interviewId,
        interviewerId: ctx.userId,
        formInstanceId: formResult.id,
        recommendation: formPayload.recommendation || 'HIRE'
      }
    });
  }
}
`,
  'services/offer.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaService) {}

  async createOfferVersion(applicationId: string, payload: any, version: number) {
    return this.prisma.recOffer.create({
      data: {
        tenantId: payload.tenantId,
        applicationId,
        version,
        baseSalary: payload.baseSalary,
        currency: payload.currency,
        validUntil: payload.validUntil
      }
    });
  }
}
`,
  'services/background-verification.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class BackgroundVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async initiate(ctx: PlatformContext, applicationId: string) {
    return this.prisma.recBackgroundVerification.create({
      data: {
        tenantId: ctx.tenantId,
        applicationId,
        vendorName: 'DefaultVendor'
      }
    });
  }
}
`,
  'services/recruitment-lifecycle.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { RecruitmentValidationService } from './recruitment-validation.service';
import { RecruitmentTimelineService } from './recruitment-timeline.service';
import { CandidateService } from './candidate.service';

@Injectable()
export class RecruitmentLifecycleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly validator: RecruitmentValidationService,
    private readonly timeline: RecruitmentTimelineService,
    private readonly candidate: CandidateService
  ) {}

  async processApplication(ctx: PlatformContext, payload: any) {
    await this.validator.validateNewCandidate(ctx, payload);
    const candidate = await this.candidate.createCandidate(ctx, payload);

    const app = await this.prisma.recCandidateApplication.create({
      data: {
        tenantId: ctx.tenantId,
        candidateId: candidate.id,
        requisitionId: payload.requisitionId,
        status: 'APPLIED'
      }
    });

    await this.timeline.recordEvent(ctx, app.id, 'APPLIED');
    await this.sdk.events.publish(ctx, 'CandidateApplied', { applicationId: app.id });
    
    return app;
  }

  async scheduleInterview(ctx: PlatformContext, applicationId: string, payload: any) {
    const interview = await this.prisma.recInterview.create({
      data: {
        tenantId: ctx.tenantId,
        applicationId,
        requisitionId: payload.requisitionId,
        title: payload.title,
        roundNumber: payload.roundNumber,
        scheduledAt: payload.scheduledAt,
        durationMinutes: payload.durationMinutes
      }
    });
    
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'INTERVIEWING' }
    });

    await this.timeline.recordEvent(ctx, applicationId, 'INTERVIEW_SCHEDULED');
    await this.sdk.events.publish(ctx, 'InterviewScheduled', { interviewId: interview.id });
    
    return interview;
  }

  async acceptOffer(ctx: PlatformContext, applicationId: string) {
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'OFFER_ACCEPTED' }
    });

    await this.timeline.recordEvent(ctx, applicationId, 'OFFER_ACCEPTED');
    await this.sdk.events.publish(ctx, 'OfferAccepted', { applicationId });
    
    // Check if background verification is needed, otherwise transition directly
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'BACKGROUND_VERIFICATION' }
    });

    // SIMULATING: Background verified -> Ready for Onboarding
    await this.completeBackgroundVerification(ctx, applicationId);
  }

  async completeBackgroundVerification(ctx: PlatformContext, applicationId: string) {
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'ONBOARDING' }
    });

    await this.timeline.recordEvent(ctx, applicationId, 'BACKGROUND_VERIFIED');
    
    // IMPORTANT DECOUPLING EVENT: Emit CandidateReadyForOnboarding
    await this.sdk.events.publish(ctx, 'CandidateReadyForOnboarding', { applicationId });
  }
}
`,
  'services/recruitment-bootstrap.service.ts': `import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class RecruitmentBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(RecruitmentBootstrapService.name);

  constructor(private readonly sdk: PlatformSDK) {}

  async onModuleInit() {
    this.logger.log('Bootstrapping Recruitment Reporting Datasets...');
    
    const ctx: PlatformContext = {
      tenantId: 'system',
      organizationId: 'system',
      userId: 'system',
      correlationId: 'bootstrap-rec-001',
      featureFlags: {}
    };

    const datasets = [
      { name: 'RecruitmentFunnelDataset', fields: { totalApplied: 'Int', shortlisted: 'Int', interviewed: 'Int', hired: 'Int' } },
      { name: 'CandidateDemographicsDataset', fields: { source: 'String', location: 'String', experienceYears: 'Int' } },
      { name: 'TimeToCheckDataset', fields: { averageDays: 'Float', byDepartment: 'Json' } }
    ];

    for (const ds of datasets) {
      await this.sdk.reporting.registerDataset(ctx, ds.name, ds.fields);
    }
  }
}
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, filename), content, 'utf8');
}

console.log('Recruitment module scaffolded successfully.');
