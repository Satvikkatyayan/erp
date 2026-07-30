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
exports.PaySalaryComponentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PaySalaryComponentRepository = class PaySalaryComponentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id, tx) {
        const client = tx || this.prisma;
        return client.paySalaryComponent.findUnique({ where: { id } });
    }
    async save(data, tx) {
        const client = tx || this.prisma;
        if (data.id) {
            return client.paySalaryComponent.update({ where: { id: data.id }, data });
        }
        return client.paySalaryComponent.create({ data });
    }
};
exports.PaySalaryComponentRepository = PaySalaryComponentRepository;
exports.PaySalaryComponentRepository = PaySalaryComponentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaySalaryComponentRepository);
//# sourceMappingURL=salary-component.repository.js.map