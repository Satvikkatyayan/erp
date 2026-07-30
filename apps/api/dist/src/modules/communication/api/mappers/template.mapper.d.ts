import { TemplateResponseDto, TemplateVersionResponseDto, TemplateVariableResponseDto } from '../dtos/template-responses.dto';
export declare class TemplateMapper {
    success<T>(data: T, message?: string): {
        success: boolean;
        message: string;
        data: T;
    };
    mapToTemplateDto(record: any): TemplateResponseDto;
    mapToVersionDto(record: any): TemplateVersionResponseDto;
    mapToVariableDto(record: any): TemplateVariableResponseDto;
    mapToTemplateDtoList(records: any[]): TemplateResponseDto[];
}
//# sourceMappingURL=template.mapper.d.ts.map