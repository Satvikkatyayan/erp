"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceStateMachine = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AttendanceStateMachine = class AttendanceStateMachine {
    constructor() {
        this.validTransitions = {
            [client_1.MusterWorkflowStatus.DRAFT]: [client_1.MusterWorkflowStatus.SUBMITTED],
            [client_1.MusterWorkflowStatus.SUBMITTED]: [client_1.MusterWorkflowStatus.VALIDATED, client_1.MusterWorkflowStatus.DRAFT],
            [client_1.MusterWorkflowStatus.VALIDATED]: [client_1.MusterWorkflowStatus.UNDER_REVIEW],
            [client_1.MusterWorkflowStatus.UNDER_REVIEW]: [client_1.MusterWorkflowStatus.LOCKED, client_1.MusterWorkflowStatus.REVIEWED],
            [client_1.MusterWorkflowStatus.REVIEWED]: [client_1.MusterWorkflowStatus.LOCKED],
            [client_1.MusterWorkflowStatus.LOCKED]: [client_1.MusterWorkflowStatus.CORRECTION_REQUESTED],
            [client_1.MusterWorkflowStatus.CORRECTION_REQUESTED]: [client_1.MusterWorkflowStatus.REOPENED, client_1.MusterWorkflowStatus.LOCKED],
            [client_1.MusterWorkflowStatus.REOPENED]: [client_1.MusterWorkflowStatus.LOCKED],
            [client_1.MusterWorkflowStatus.ESCALATED]: [client_1.MusterWorkflowStatus.UNDER_REVIEW]
        };
    }
    canTransition(from, to) {
        const allowed = this.validTransitions[from];
        return allowed ? allowed.includes(to) : false;
    }
    validateTransition(ctx) {
        if (!this.canTransition(ctx.from, ctx.to)) {
            throw new common_1.BadRequestException(`Invalid workflow transition from ${ctx.from} to ${ctx.to}.`);
        }
        if (ctx.to === client_1.MusterWorkflowStatus.SUBMITTED && !ctx.actorRoles.includes('SITE_CLERK') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
            throw new common_1.BadRequestException(`Only Site Clerk can submit attendance.`);
        }
        if (ctx.to === client_1.MusterWorkflowStatus.VALIDATED && !ctx.actorRoles.includes('PROJECT_MANAGER') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
            throw new common_1.BadRequestException(`Only Project Manager can validate attendance.`);
        }
        if (ctx.to === client_1.MusterWorkflowStatus.UNDER_REVIEW && !ctx.actorRoles.includes('HR_ADMIN') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
            throw new common_1.BadRequestException(`Only HR can start the review process.`);
        }
        if (ctx.to === client_1.MusterWorkflowStatus.LOCKED && !ctx.actorRoles.includes('OWNER') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
            throw new common_1.BadRequestException(`Only Owner can lock attendance.`);
        }
    }
    transition(from, to) {
        if (!this.canTransition(from, to)) {
            throw new common_1.BadRequestException(`Invalid transition: ${from} -> ${to}`);
        }
        return to;
    }
};
exports.AttendanceStateMachine = AttendanceStateMachine;
exports.AttendanceStateMachine = AttendanceStateMachine = __decorate([
    (0, common_1.Injectable)()
], AttendanceStateMachine);
//# sourceMappingURL=attendance-state-machine.service.js.map