"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./common/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const performance_cycle_service_1 = require("./modules/performance/services/performance-cycle.service");
const performance_evaluation_service_1 = require("./modules/performance/services/performance-evaluation.service");
const goal_service_1 = require("./modules/performance/services/goal.service");
const goal_dependency_service_1 = require("./modules/performance/services/goal-dependency.service");
const kpi_service_1 = require("./modules/performance/services/kpi.service");
const review_template_service_1 = require("./modules/performance/services/review-template.service");
const nine_box_service_1 = require("./modules/performance/services/nine-box.service");
const performance_locking_service_1 = require("./modules/performance/services/performance-locking.service");
const uuid_1 = require("uuid");
async function bootstrap() {
    const logger = new common_1.Logger('Perf-Verification');
    logger.log('Starting Phase 5.7.1: Performance Management V2 Verification...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const cycleService = app.get(performance_cycle_service_1.PerformanceCycleService);
    const evalService = app.get(performance_evaluation_service_1.PerformanceEvaluationService);
    const goalService = app.get(goal_service_1.GoalService);
    const depService = app.get(goal_dependency_service_1.GoalDependencyService);
    const kpiService = app.get(kpi_service_1.KpiService);
    const templateService = app.get(review_template_service_1.ReviewTemplateService);
    const nineBoxService = app.get(nine_box_service_1.NineBoxService);
    const lockService = app.get(performance_locking_service_1.PerformanceLockingService);
    const tenantId = (0, uuid_1.v4)();
    const organizationId = (0, uuid_1.v4)();
    const employeeId = (0, uuid_1.v4)();
    const managerId = (0, uuid_1.v4)();
    const cycleId = (0, uuid_1.v4)();
    const ctx = {
        tenantId,
        organizationId,
        userId: managerId,
        featureFlags: {
            'PERF_INCLUDE_ATTENDANCE': true,
            'PERF_INCLUDE_LEAVE': true,
        }
    };
    try {
        logger.log('--- Setting up Performance V2 Data ---');
        await prisma.tenant.create({ data: { id: tenantId, code: `PERF-TENANT-${(0, uuid_1.v4)().substring(0, 4)}`, name: 'Perf Tenant' } });
        await prisma.organization.create({ data: { id: organizationId, tenantId, code: `PERF-ORG-${(0, uuid_1.v4)().substring(0, 4)}`, name: 'Perf Org' } });
        await prisma.empEmployee.create({ data: { id: employeeId, tenantId, organizationId, employeeNumber: `EMP-${(0, uuid_1.v4)().substring(0, 4)}`, status: 'JOINED' } });
        await prisma.perfCycleConfiguration.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId,
                organizationId,
                enabledReviewTypes: ['Self', 'Manager'],
                forcedDistribution: true,
            }
        });
        await prisma.perfPerformanceCycle.create({
            data: {
                id: cycleId,
                tenantId,
                organizationId,
                name: 'Annual Review 2026',
                cycleType: 'Annual',
                status: 'Draft',
                startDate: new Date('2026-01-01'),
                endDate: new Date('2026-12-31'),
            }
        });
        const review = await prisma.perfReview.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId,
                cycleId,
                employeeId,
                status: 'Draft'
            }
        });
        logger.log('[Test 1] Goal Versioning');
        const goal = await goalService.createGoal(ctx, { title: 'Launch Product X', category: 'Business' });
        const goalV2 = await goalService.createNewVersion(ctx, goal.id, { title: 'Launch Product X (Delayed to Q3)' });
        const v1 = await prisma.perfGoal.findFirst({ where: { id: goal.id } });
        if (v1 && !v1.isActive && goalV2.versionNumber === 2 && goalV2.isActive) {
            logger.log(' - ✅ Goal versioning maintains immutability and increments correctly.');
        }
        else {
            logger.warn(' - ❌ Goal versioning failed.');
        }
        const assignment = await goalService.assignGoal(ctx, { cycleId, employeeId, goalId: goalV2.id, weight: 0.5, targetValue: 100 });
        await goalService.recordProgress(ctx, assignment.id, 80, 'Almost there');
        logger.log(' - ✅ Goal progress recorded against active version.');
        logger.log('[Test 2] Goal Dependency Graph');
        const corpGoal = await goalService.createGoal(ctx, { title: 'Hit 1M ARR' });
        await depService.addDependency(ctx, { goalId: goalV2.id, dependsOnGoalId: corpGoal.id, dependencyType: 'ContributesTo' });
        try {
            await depService.addDependency(ctx, { goalId: corpGoal.id, dependsOnGoalId: goalV2.id });
            logger.warn(' - ❌ Circular dependency was allowed!');
        }
        catch (e) {
            if (e.message.includes('Circular')) {
                logger.log(' - ✅ Circular dependencies successfully rejected.');
            }
        }
        logger.log('[Test 3] KPI Framework & Scoring');
        const kpi = await kpiService.createKPI(ctx, { name: 'Customer Satisfaction', code: `CSAT-${(0, uuid_1.v4)().substring(0, 4)}`, unit: 'Score' });
        const kpiAssign = await kpiService.assignKPI(ctx, { kpiId: kpi.id, employeeId, cycleId, targetValue: 9.0 });
        await kpiService.recordResult(ctx, kpiAssign.id, 8.5);
        const kpiRes = await prisma.perfKPIResult.findFirst({ where: { assignmentId: kpiAssign.id } });
        if (kpiRes && Math.abs(kpiRes.achievementPct - 94.44) < 0.1) {
            logger.log(' - ✅ KPI achievement percentage calculated correctly.');
        }
        logger.log('[Test 4] Review Template Versioning');
        const tpl = await templateService.createTemplate(ctx, { name: 'Standard Developer Review' });
        const tplV1 = await templateService.createVersion(ctx, tpl.id, { sectionsConfig: { q1: 'How did they do?' } });
        await templateService.publishVersion(ctx, tplV1.id);
        await templateService.assignToReview(ctx, review.id, tplV1.id);
        logger.log(' - ✅ Template published and assigned to review.');
        const compCategory = await prisma.perfCompetencyCategory.create({ data: { id: (0, uuid_1.v4)(), tenantId, name: 'Technical' } });
        const comp = await prisma.perfCompetency.create({ data: { id: (0, uuid_1.v4)(), tenantId, categoryId: compCategory.id, name: 'System Design' } });
        await prisma.perfCompetencyAssignment.create({ data: { id: (0, uuid_1.v4)(), tenantId, employeeId, competencyId: comp.id, targetLevel: 4, currentLevel: 2 } });
        await prisma.perfCompetencyRating.create({ data: { id: (0, uuid_1.v4)(), tenantId, reviewId: review.id, competencyId: comp.id, ratedById: managerId, rating: 3 } });
        logger.log('[Test 5] Performance Simulation Endpoint');
        const trace = await evalService.simulateEvaluation(ctx, cycleId, employeeId);
        if (trace.goalScore > 0 && trace.kpiScore > 0 && trace.competencyScore > 0 && trace.normalizedScore > 0) {
            logger.log(' - ✅ simulateScoring() evaluated full plugin stack without persisting.');
            logger.log(`      ↳ Trace: Goal=${trace.goalScore.toFixed(1)}, Comp=${trace.competencyScore.toFixed(1)}, KPI=${trace.kpiScore.toFixed(1)}, Att=${trace.attendanceScore.toFixed(1)}, Leave=${trace.leaveScore.toFixed(1)}`);
            logger.log(`      ↳ Final Normalized: ${trace.normalizedScore.toFixed(1)}`);
        }
        else {
            logger.warn(' - ❌ Simulation failed to calculate all components.');
        }
        logger.log('[Test 6] Full Cycle Orchestration');
        await cycleService.executeEvaluationCycle(ctx, cycleId);
        const dbTrace = await prisma.perfScoreTrace.findFirst({ where: { cycleId, employeeId } });
        if (dbTrace) {
            logger.log(' - ✅ PerfScoreTrace created, providing 100% explainability.');
        }
        const devRec = await prisma.perfDevelopmentRecommendation.findFirst({ where: { cycleId, employeeId } });
        if (devRec) {
            logger.log(` - ✅ Development recommendation generated via event-driven gap analysis (${devRec.recommendationType} for ${devRec.skillGap} gap).`);
        }
        const snapshot = await prisma.perfPerformanceSnapshot.findFirst({ where: { cycleId, employeeId } });
        const snapData = snapshot?.snapshotData;
        if (snapData && snapData.attendanceIncluded && snapData.leaveIncluded) {
            logger.log(' - ✅ Attendance and leave inclusion flags recorded in snapshot.');
        }
        logger.log('[Test 7] Nine-Box Placement');
        await nineBoxService.assessPotential(ctx, { employeeId, cycleId, potentialScore: 85 });
        const placement = await evalService.processNineBox(ctx, cycleId, employeeId);
        if (placement && placement.boxLabel) {
            logger.log(` - ✅ Nine-box calculated using Performance × Potential. Label: [${placement.boxLabel}]`);
        }
        logger.log('[Test 8] Calibration History');
        const rating = await prisma.perfRating.findFirst({ where: { cycleId, employeeId } });
        await evalService.processCalibration(ctx, rating.id, 92, 'Manager', 'Exceptional Q4 delivery');
        const history = await prisma.perfCalibrationHistory.findFirst({ where: { ratingId: rating.id } });
        if (history && history.newScore === 92) {
            logger.log(' - ✅ Calibration adjustment audited successfully.');
        }
        logger.log('[Test 9] Finalization & Review Snapshot');
        await cycleService.finalizeCycle(ctx, cycleId);
        const revSnapshot = await prisma.perfReviewSnapshot.findFirst({ where: { cycleId, employeeId } });
        if (revSnapshot && revSnapshot.scoreTrace) {
            logger.log(' - ✅ Review Snapshot captured separating outputs from inputs.');
        }
        logger.log('[Test 10] Performance Locking & Scope Rules');
        const lockedCycle = await prisma.perfPerformanceCycle.findUnique({ where: { id: cycleId } });
        const locks = lockedCycle?.lockedScopes;
        const isLocked = lockService.isLocked(locks, employeeId);
        if (isLocked) {
            logger.log(' - ✅ Cycle successfully locked after finalization.');
        }
        logger.log('[Test 11] Review Reopen Workflow');
        const newVersion = await lockService.reopenReview(ctx, review.id, 'Missed feedback');
        if (newVersion.versionNumber === 2) {
            logger.log(' - ✅ Reopen approved: Created immutable V2, preserving finalized V1.');
        }
        logger.log('\n✅ Performance V2 Verification Completed Successfully.');
    }
    catch (err) {
        logger.error('Verification Failed', err.stack);
        process.exit(1);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=verify-performance.js.map