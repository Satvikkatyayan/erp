export declare class QueryResult<T> {
    readonly data: T;
    readonly metadata?: any;
    readonly errors?: any[];
    constructor(data: T, metadata?: any, errors?: any[]);
    static success<T>(data: T, metadata?: any): QueryResult<T>;
    static failure<T>(errors: any[]): QueryResult<T>;
}
//# sourceMappingURL=query-result.d.ts.map