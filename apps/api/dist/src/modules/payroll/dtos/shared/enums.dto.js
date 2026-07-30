"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPayrollReviewStatusEnum = exports.ApiPayrollRunStatusEnum = void 0;
var ApiPayrollRunStatusEnum;
(function (ApiPayrollRunStatusEnum) {
    ApiPayrollRunStatusEnum["DRAFT"] = "Draft";
    ApiPayrollRunStatusEnum["COLLECTING"] = "Collecting";
    ApiPayrollRunStatusEnum["CALCULATING"] = "Calculating";
    ApiPayrollRunStatusEnum["APPROVED"] = "Approved";
    ApiPayrollRunStatusEnum["LOCKED"] = "Locked";
    ApiPayrollRunStatusEnum["PROCESSED"] = "Processed";
    ApiPayrollRunStatusEnum["CANCELLED"] = "Cancelled";
    ApiPayrollRunStatusEnum["ARCHIVED"] = "Archived";
})(ApiPayrollRunStatusEnum || (exports.ApiPayrollRunStatusEnum = ApiPayrollRunStatusEnum = {}));
var ApiPayrollReviewStatusEnum;
(function (ApiPayrollReviewStatusEnum) {
    ApiPayrollReviewStatusEnum["PENDING"] = "PENDING";
    ApiPayrollReviewStatusEnum["APPROVED"] = "APPROVED";
    ApiPayrollReviewStatusEnum["REJECTED"] = "REJECTED";
    ApiPayrollReviewStatusEnum["RETURNED"] = "RETURNED";
    ApiPayrollReviewStatusEnum["CANCELLED"] = "CANCELLED";
})(ApiPayrollReviewStatusEnum || (exports.ApiPayrollReviewStatusEnum = ApiPayrollReviewStatusEnum = {}));
//# sourceMappingURL=enums.dto.js.map