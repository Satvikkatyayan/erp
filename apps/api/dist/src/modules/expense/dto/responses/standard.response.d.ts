export declare class ErrorResponse {
    statusCode: number;
    message: string;
    error?: string;
}
export declare class CommandResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}
export declare class QueryResponse<T = any> {
    data: T;
}
export declare class PagedResponse<T = any> {
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}
//# sourceMappingURL=standard.response.d.ts.map