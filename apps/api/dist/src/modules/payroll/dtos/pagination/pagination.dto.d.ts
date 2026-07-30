export declare class PaginationRequestDto {
    page?: number;
    pageSize?: number;
}
export declare class PaginationResponseDto<T> {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    data: T[];
}
//# sourceMappingURL=pagination.dto.d.ts.map