"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRunQueryDto = void 0;
const pagination_dto_1 = require("../pagination/pagination.dto");
const sorting_dto_1 = require("../sorting/sorting.dto");
const payroll_filters_dto_1 = require("../filters/payroll-filters.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class PayrollRunQueryDto extends (0, mapped_types_1.IntersectionType)((0, mapped_types_1.IntersectionType)(pagination_dto_1.PaginationRequestDto, sorting_dto_1.SortingDto), payroll_filters_dto_1.PayrollFiltersDto) {
}
exports.PayrollRunQueryDto = PayrollRunQueryDto;
//# sourceMappingURL=payroll-run.query.dto.js.map