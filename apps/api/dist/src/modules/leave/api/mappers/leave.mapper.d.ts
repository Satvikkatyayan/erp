import { APIResponseDto } from '../dtos/responses.dto';
interface IRequestContextService {
    correlationId: string;
}
export declare class LeaveMapper {
    private readonly contextService;
    constructor(contextService: IRequestContextService);
    success<T>(data: T, message?: string): APIResponseDto<T>;
    error(code: string, message: string, details?: any[]): APIResponseDto<null>;
}
export {};
//# sourceMappingURL=leave.mapper.d.ts.map