"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentModule = void 0;
const common_1 = require("@nestjs/common");
const recruitment_controller_1 = require("./controllers/recruitment.controller");
const recruitment_lifecycle_service_1 = require("./services/recruitment-lifecycle.service");
const candidate_service_1 = require("./services/candidate.service");
const interview_service_1 = require("./services/interview.service");
const offer_service_1 = require("./services/offer.service");
const background_verification_service_1 = require("./services/background-verification.service");
const recruitment_validation_service_1 = require("./services/recruitment-validation.service");
const recruitment_timeline_service_1 = require("./services/recruitment-timeline.service");
const recruitment_bootstrap_service_1 = require("./services/recruitment-bootstrap.service");
let RecruitmentModule = class RecruitmentModule {
};
exports.RecruitmentModule = RecruitmentModule;
exports.RecruitmentModule = RecruitmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [recruitment_controller_1.RecruitmentController],
        providers: [
            recruitment_lifecycle_service_1.RecruitmentLifecycleService,
            candidate_service_1.CandidateService,
            interview_service_1.InterviewService,
            offer_service_1.OfferService,
            background_verification_service_1.BackgroundVerificationService,
            recruitment_validation_service_1.RecruitmentValidationService,
            recruitment_timeline_service_1.RecruitmentTimelineService,
            recruitment_bootstrap_service_1.RecruitmentBootstrapService
        ],
        exports: [recruitment_lifecycle_service_1.RecruitmentLifecycleService]
    })
], RecruitmentModule);
//# sourceMappingURL=recruitment.module.js.map