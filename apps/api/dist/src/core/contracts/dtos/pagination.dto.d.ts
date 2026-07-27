export interface PaginationDTO {
    page: number;
    limit: number;
}
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
//# sourceMappingURL=pagination.dto.d.ts.map