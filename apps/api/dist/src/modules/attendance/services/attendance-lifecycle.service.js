"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const submit_attendance_handler_1 = require("../commands/handlers/submit-attendance.handler");
const validate_attendance_handler_1 = require("../commands/handlers/validate-attendance.handler");
const start_review_handler_1 = require("../commands/handlers/start-review.handler");
const lock_attendance_handler_1 = require("../commands/handlers/lock-attendance.handler");
const request_correction_handler_1 = require("../commands/handlers/request-correction.handler");
const approve_correction_handler_1 = require("../commands/handlers/approve-correction.handler");
const reject_correction_handler_1 = require("../commands/handlers/reject-correction.handler");
const reopen_attendance_handler_1 = require("../commands/handlers/reopen-attendance.handler");
const submit_attendance_command_1 = require("../commands/submit-attendance.command");
const validate_attendance_command_1 = require("../commands/validate-attendance.command");
const start_review_command_1 = require("../commands/start-review.command");
const lock_attendance_command_1 = require("../commands/lock-attendance.command");
const request_correction_command_1 = require("../commands/request-correction.command");
const approve_correction_command_1 = require("../commands/approve-correction.command");
const reject_correction_command_1 = require("../commands/reject-correction.command");
const reopen_attendance_command_1 = require("../commands/reopen-attendance.command");
let AttendanceLifecycleService = class AttendanceLifecycleService {
    constructor(submitHandler, validateHandler, startReviewHandler, lockHandler, reqCorrectionHandler, appCorrectionHandler, rejCorrectionHandler, reopenHandler) {
        this.submitHandler = submitHandler;
        this.validateHandler = validateHandler;
        this.startReviewHandler = startReviewHandler;
        this.lockHandler = lockHandler;
        this.reqCorrectionHandler = reqCorrectionHandler;
        this.appCorrectionHandler = appCorrectionHandler;
        this.rejCorrectionHandler = rejCorrectionHandler;
        this.reopenHandler = reopenHandler;
    }
    extractActorRoles(ctx) {
        return ctx.roles || [];
    }
    async submitMuster(ctx, musterId, reason) {
        const cmd = new submit_attendance_command_1.SubmitAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.submitHandler.execute(cmd);
    }
    async validateMuster(ctx, musterId, reason) {
        const cmd = new validate_attendance_command_1.ValidateAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.validateHandler.execute(cmd);
    }
    async startReview(ctx, musterId, reason) {
        const cmd = new start_review_command_1.StartReviewCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.startReviewHandler.execute(cmd);
    }
    async lockMuster(ctx, musterId, reason) {
        const cmd = new lock_attendance_command_1.LockAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.lockHandler.execute(cmd);
    }
    async requestCorrection(ctx, musterId, reason) {
        const cmd = new request_correction_command_1.RequestCorrectionCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.reqCorrectionHandler.execute(cmd);
    }
    async approveCorrection(ctx, musterId, reason) {
        const cmd = new approve_correction_command_1.ApproveCorrectionCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.appCorrectionHandler.execute(cmd);
    }
    async rejectCorrection(ctx, musterId, reason) {
        const cmd = new reject_correction_command_1.RejectCorrectionCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.rejCorrectionHandler.execute(cmd);
    }
    async reopenMuster(ctx, musterId, reason) {
        const cmd = new reopen_attendance_command_1.ReopenAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
        return this.reopenHandler.execute(cmd);
    }
    async ingestPunch(ctx, employeeId, punchData) {
        throw new Error('Moved to Punch Service');
    }
    async markLossOfPay(ctx, employeeId, date, units, reason) {
        throw new Error('Moved to Calculation Service');
    }
};
exports.AttendanceLifecycleService = AttendanceLifecycleService;
exports.AttendanceLifecycleService = AttendanceLifecycleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submit_attendance_handler_1.SubmitAttendanceHandler,
        validate_attendance_handler_1.ValidateAttendanceHandler,
        start_review_handler_1.StartReviewHandler,
        lock_attendance_handler_1.LockAttendanceHandler,
        request_correction_handler_1.RequestCorrectionHandler,
        approve_correction_handler_1.ApproveCorrectionHandler,
        reject_correction_handler_1.RejectCorrectionHandler,
        reopen_attendance_handler_1.ReopenAttendanceHandler])
], AttendanceLifecycleService);
//# sourceMappingURL=attendance-lifecycle.service.js.map