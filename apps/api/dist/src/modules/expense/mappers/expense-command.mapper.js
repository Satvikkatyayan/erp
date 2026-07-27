"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCommandMapper = void 0;
const common_1 = require("@nestjs/common");
let ExpenseCommandMapper = class ExpenseCommandMapper {
    toCreateCommand(dto) {
        return { ...dto };
    }
    toUpdateCommand(id, dto) {
        return { id, ...dto };
    }
    toSubmitCommand(dto) {
        return { ...dto };
    }
    toCancelCommand(dto) {
        return { ...dto };
    }
    toAddItemCommand(claimId, dto) {
        return { claimId, ...dto };
    }
    toRemoveItemCommand(claimId, dto) {
        return { claimId, ...dto };
    }
    toUploadReceiptCommand(claimId, dto) {
        return { claimId, ...dto };
    }
};
exports.ExpenseCommandMapper = ExpenseCommandMapper;
exports.ExpenseCommandMapper = ExpenseCommandMapper = __decorate([
    (0, common_1.Injectable)()
], ExpenseCommandMapper);
//# sourceMappingURL=expense-command.mapper.js.map