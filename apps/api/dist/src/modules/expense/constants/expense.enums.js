"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateCardImportStatus = exports.ReceiptOcrStatus = exports.BudgetReservationStatus = exports.BudgetAction = exports.TravelStatus = exports.ExpenseStatus = void 0;
var ExpenseStatus;
(function (ExpenseStatus) {
    ExpenseStatus["DRAFT"] = "DRAFT";
    ExpenseStatus["SUBMITTED"] = "SUBMITTED";
    ExpenseStatus["POLICY_VALIDATION"] = "POLICY_VALIDATION";
    ExpenseStatus["APPROVAL"] = "APPROVAL";
    ExpenseStatus["FINANCE_APPROVAL"] = "FINANCE_APPROVAL";
    ExpenseStatus["PAYROLL_REIMBURSEMENT"] = "PAYROLL_REIMBURSEMENT";
    ExpenseStatus["CLOSED"] = "CLOSED";
})(ExpenseStatus || (exports.ExpenseStatus = ExpenseStatus = {}));
var TravelStatus;
(function (TravelStatus) {
    TravelStatus["DRAFT"] = "DRAFT";
    TravelStatus["SUBMITTED"] = "SUBMITTED";
    TravelStatus["APPROVED"] = "APPROVED";
    TravelStatus["ADVANCE_ISSUED"] = "ADVANCE_ISSUED";
    TravelStatus["TRAVEL_STARTED"] = "TRAVEL_STARTED";
    TravelStatus["TRAVEL_COMPLETED"] = "TRAVEL_COMPLETED";
    TravelStatus["EXPENSE_SUBMITTED"] = "EXPENSE_SUBMITTED";
    TravelStatus["SETTLEMENT"] = "SETTLEMENT";
    TravelStatus["CLOSED"] = "CLOSED";
    TravelStatus["ARCHIVED"] = "ARCHIVED";
})(TravelStatus || (exports.TravelStatus = TravelStatus = {}));
var BudgetAction;
(function (BudgetAction) {
    BudgetAction["REJECT"] = "REJECT";
    BudgetAction["ESCALATE"] = "ESCALATE";
    BudgetAction["WARN"] = "WARN";
    BudgetAction["IGNORE"] = "IGNORE";
})(BudgetAction || (exports.BudgetAction = BudgetAction = {}));
var BudgetReservationStatus;
(function (BudgetReservationStatus) {
    BudgetReservationStatus["PENDING"] = "PENDING";
    BudgetReservationStatus["CONVERTED"] = "CONVERTED";
    BudgetReservationStatus["RELEASED"] = "RELEASED";
})(BudgetReservationStatus || (exports.BudgetReservationStatus = BudgetReservationStatus = {}));
var ReceiptOcrStatus;
(function (ReceiptOcrStatus) {
    ReceiptOcrStatus["PENDING"] = "PENDING";
    ReceiptOcrStatus["PROCESSED"] = "PROCESSED";
    ReceiptOcrStatus["FAILED"] = "FAILED";
})(ReceiptOcrStatus || (exports.ReceiptOcrStatus = ReceiptOcrStatus = {}));
var CorporateCardImportStatus;
(function (CorporateCardImportStatus) {
    CorporateCardImportStatus["PROCESSING"] = "PROCESSING";
    CorporateCardImportStatus["COMPLETED"] = "COMPLETED";
    CorporateCardImportStatus["FAILED"] = "FAILED";
})(CorporateCardImportStatus || (exports.CorporateCardImportStatus = CorporateCardImportStatus = {}));
//# sourceMappingURL=expense.enums.js.map