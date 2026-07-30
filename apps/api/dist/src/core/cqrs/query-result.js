"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResult = void 0;
class QueryResult {
    constructor(data, metadata, errors) {
        this.data = data;
        this.metadata = metadata;
        this.errors = errors;
    }
    static success(data, metadata) {
        return new QueryResult(data, metadata);
    }
    static failure(errors) {
        return new QueryResult(null, undefined, errors);
    }
}
exports.QueryResult = QueryResult;
//# sourceMappingURL=query-result.js.map