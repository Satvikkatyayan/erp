import { APIResponseDto } from '../dtos/responses.dto';
import { RequestContextService } from '../../../../core/context/request-context.service';
export declare class EmployeeMapper {
    private readonly contextService;
    constructor(contextService: RequestContextService);
    success<T>(data: T, message?: string): APIResponseDto<T>;
    error(code: string, message: string, details?: any[]): APIResponseDto<null>;
}
//# sourceMappingURL=employee.mapper.d.ts.map