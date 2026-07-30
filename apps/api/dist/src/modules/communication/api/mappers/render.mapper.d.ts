import { RenderResult } from '../../services/template-rendering.service';
import { RenderResponseDto } from '../dtos/render-responses.dto';
export declare class RenderMapper {
    mapToResponseDto(result: RenderResult): RenderResponseDto;
    success<T>(data: T, message?: string): {
        success: boolean;
        message: string;
        data: T;
    };
}
//# sourceMappingURL=render.mapper.d.ts.map