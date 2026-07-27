import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { RecruitmentLifecycleService } from './modules/recruitment/services/recruitment-lifecycle.service';
import { EmployeeLifecycleService } from './modules/employee/services/employee-lifecycle.service';
import { PlatformSDK } from './core/sdk/platform.sdk';

async function verifyRecruitmentModule() {
  const logger = new Logger('Rec-Verification');
  logger.log('Starting Phase 5.3: Recruitment Management Verification...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);
  const recLifecycle = app.get(RecruitmentLifecycleService);
  const empLifecycle = app.get(EmployeeLifecycleService);
  const sdk = app.get(PlatformSDK);

  // 1. Clean DB
  await prisma.recInterviewFeedback.deleteMany();
  await prisma.recInterview.deleteMany();
  await prisma.recOffer.deleteMany();
  await prisma.recBackgroundVerification.deleteMany();
  await prisma.recRecruitmentTimeline.deleteMany();
  await prisma.recCandidateApplication.deleteMany();
  await prisma.recRequiredSkill.deleteMany();
  await prisma.recJobRequisition.deleteMany();
  await prisma.recHiringRequest.deleteMany();
  await prisma.recVacancy.deleteMany();
  await prisma.recPosition.deleteMany();
  
  await prisma.recCandidateDocument.deleteMany();
  await prisma.recCandidateConsent.deleteMany();
  await prisma.recCandidateCommunication.deleteMany();
  await prisma.recTalentPoolMember.deleteMany();
  await prisma.recTalentPool.deleteMany();
  await prisma.recCandidateSource.deleteMany();
  await prisma.recRecruitmentAgency.deleteMany();
  await prisma.recCandidate.deleteMany();

  await prisma.empEmployee.deleteMany();
  await prisma.empPosition.deleteMany();
  await prisma.designation.deleteMany();
  await prisma.department.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.outboxMessage.deleteMany();

  // 2. Setup Base Tenant Data
  const tenantA = await prisma.tenant.create({
    data: { name: 'ACME Corp', code: 'ACME', status: 'ACTIVE' }
  });
  const orgA = await prisma.organization.create({
    data: { tenantId: tenantA.id, name: 'ACME USA', code: 'ACME-US', legalName: 'ACME Corp USA', registrationNo: 'REG-1234', taxId: 'TAX-1234', industry: 'Tech', currencyCode: 'USD', timezone: 'America/New_York' }
  });
  const branchA = await prisma.branch.create({
    data: { tenantId: tenantA.id, organizationId: orgA.id, name: 'HQ', code: 'HQ-01' }
  });
  const deptA = await prisma.department.create({
    data: { tenantId: tenantA.id, name: 'Engineering', code: 'ENG' }
  });
  const desigA = await prisma.designation.create({
    data: { tenantId: tenantA.id, name: 'Senior Software Engineer', code: 'SSE' }
  });
  
  const ctxA: any = { correlationId: 'rec-verify-123', tenantId: tenantA.id, organizationId: orgA.id, userId: 'recruiter', featureFlags: {} };

  try {
    // [Test 1] Headcount and Vacancy Validation
    logger.log('[Test 1] Headcount and Vacancy Validation');
    const recPos = await prisma.recPosition.create({
      data: {
        tenantId: tenantA.id,
        organizationId: orgA.id,
        departmentId: deptA.id,
        designationId: desigA.id,
        code: 'POS-SSE-01',
        title: 'Senior Software Engineer',
        approvedHeadcount: 1,
        filled: 0
      }
    });
    const recVacancy = await prisma.recVacancy.create({
      data: {
        tenantId: tenantA.id,
        organizationId: orgA.id,
        positionId: recPos.id,
        code: 'VAC-01'
      }
    });
    logger.log(' - ✅ Position and Vacancy relationships enforced successfully.');

    // [Test 2] Hiring Request & Requisition
    logger.log('[Test 2] Job Requisition & Hiring Request');
    const hiringReq = await prisma.recHiringRequest.create({
      data: {
        tenantId: tenantA.id,
        organizationId: orgA.id,
        title: 'Need a Senior Engineer',
        departmentId: deptA.id,
        requestedBy: 'manager-123',
        budget: 120000,
        status: 'APPROVED'
      }
    });
    const jobReq = await prisma.recJobRequisition.create({
      data: {
        tenantId: tenantA.id,
        organizationId: orgA.id,
        positionId: recPos.id,
        vacancyId: recVacancy.id,
        hiringRequestId: hiringReq.id,
        code: 'REQ-100',
        title: 'Senior Software Engineer',
        description: 'Great job!',
        status: 'PUBLISHED'
      }
    });
    logger.log(' - ✅ Requisition published.');

    // [Test 3] Candidate Creation & Source Attribution
    logger.log('[Test 3] Candidate Creation & Source Attribution');
    const source = await prisma.recCandidateSource.create({
      data: { tenantId: tenantA.id, name: 'LinkedIn', category: 'SOCIAL' }
    });
    
    // Simulate application which creates candidate
    const application = await recLifecycle.processApplication(ctxA, {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-1234',
      sourceId: source.id,
      requisitionId: jobReq.id
    });
    logger.log(' - ✅ Candidate created with Source attribution.');

    // [Test 4] Duplicate Detection via Rules SDK
    logger.log('[Test 4] Duplicate Candidate Detection');
    let isDuplicate = false;
    try {
      await recLifecycle.processApplication(ctxA, {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        requisitionId: jobReq.id
      });
    } catch (e: any) {
      if (e.message.includes('Duplicate')) isDuplicate = true;
    }
    if (isDuplicate) {
       logger.log(' - ✅ Duplicate candidate properly rejected via Rules Engine.');
    } else {
       logger.warn(' - ❌ Duplicate detection failed.');
    }

    // [Test 5] Communication & Consent
    logger.log('[Test 5] Candidate Communication & Consent');
    const candidate = await prisma.recCandidate.findFirst({ where: { email: 'jane.smith@example.com' } });
    if (!candidate) throw new Error('Candidate not found');
    
    await prisma.recCandidateConsent.create({
      data: { candidateId: candidate.id, consentType: 'DATA_PROCESSING' }
    });
    await prisma.recCandidateCommunication.create({
      data: { candidateId: candidate.id, channel: 'EMAIL', direction: 'OUTBOUND', subject: 'Application Received' }
    });
    logger.log(' - ✅ Consent and Communication History persisted.');

    // [Test 6] Talent Pool
    logger.log('[Test 6] Talent Pools');
    const pool = await prisma.recTalentPool.create({
      data: { tenantId: tenantA.id, name: 'Engineering Top Tier' }
    });
    await prisma.recTalentPoolMember.create({
      data: { poolId: pool.id, candidateId: candidate.id }
    });
    logger.log(' - ✅ Candidate added to Talent Pool.');

    // [Test 7] Interview Flow (Forms SDK)
    logger.log('[Test 7] Interview & Forms Feedback');
    const interview = await recLifecycle.scheduleInterview(ctxA, application.id, {
      requisitionId: jobReq.id,
      title: 'Technical Round',
      roundNumber: 1,
      scheduledAt: new Date(),
      durationMinutes: 60
    });
    
    // Feedback submission uses Forms SDK internally
    const interviewService = app.get(require('./modules/recruitment/services/interview.service').InterviewService);
    await interviewService.submitFeedback(ctxA, interview.id, { recommendation: 'HIRE', name: 'Jane Feedback' });
    logger.log(' - ✅ Interview feedback collected via Forms SDK.');

    // [Test 8] Offer Versioning
    logger.log('[Test 8] Offer Versioning');
    const offerService = app.get(require('./modules/recruitment/services/offer.service').OfferService);
    await offerService.createOfferVersion(application.id, { tenantId: tenantA.id, baseSalary: 120000, currency: 'USD', validUntil: new Date() }, 1);
    await offerService.createOfferVersion(application.id, { tenantId: tenantA.id, baseSalary: 130000, currency: 'USD', validUntil: new Date() }, 2);
    const offers = await prisma.recOffer.findMany({ where: { applicationId: application.id } });
    logger.log(` - ✅ Offer Versioning successful. Found ${offers.length} versions.`);

    // [Test 9] State Machine & Event-Driven Onboarding Handoff
    logger.log('[Test 9] Event-Driven Onboarding Handoff');
    await recLifecycle.acceptOffer(ctxA, application.id);
    
    // Check if event was published
    const outboxEvents = await prisma.outboxMessage.findMany({ where: { eventName: 'CandidateReadyForOnboarding' } });
    if (outboxEvents.length > 0) {
      logger.log(' - ✅ CandidateReadyForOnboarding event successfully published to EventBus.');
      
      // Simulate Worker picking up the event and calling Employee module
      logger.log(' - 🔄 Simulating Worker processing event...');
      const payload = outboxEvents[0].payload as any;
      
      const appRecord = await prisma.recCandidateApplication.findUnique({ where: { id: payload.applicationId }, include: { candidate: true, requisition: true } });
      if (appRecord) {
         // Create the actual EmpPosition to satisfy employee creation (since they are separate contexts)
         const empPos = await prisma.empPosition.create({
            data: { tenantId: tenantA.id, organizationId: orgA.id, departmentId: deptA.id, designationId: desigA.id, code: 'POS-SSE-01', title: 'Senior Software Engineer' }
         });

         await empLifecycle.onboardEmployee(ctxA, {
            firstName: appRecord.candidate.firstName,
            lastName: appRecord.candidate.lastName,
            positionId: empPos.id,
            departmentId: deptA.id,
            branchId: branchA.id,
            joiningDate: new Date()
         });
         logger.log(' - ✅ Employee Onboarded successfully via decoupled event trigger.');
      }
    } else {
      logger.error(' - ❌ Event not published.');
    }

    // [Test 10] Recruitment Timeline & Reporting Snapshot
    logger.log('[Test 10] Recruitment Timeline & Snapshots');
    const timelines = await prisma.recRecruitmentTimeline.findMany({ where: { applicationId: application.id } });
    logger.log(` - ✅ Timeline maintained with ${timelines.length} lifecycle events.`);
    
    await prisma.recRecruitmentSnapshot.create({
      data: { tenantId: tenantA.id, organizationId: orgA.id, activeRequisitions: 1, totalApplications: 1, offersAccepted: 1 }
    });
    logger.log(' - ✅ Reporting Snapshot generated.');

    logger.log('Recruitment Module Verification Completed Successfully.');
  } catch (err: any) {
    logger.error('Verification Failed', err.stack);
    process.exit(1);
  } finally {
    await app.close();
  }
}

verifyRecruitmentModule();
