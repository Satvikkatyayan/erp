export declare class TemplateVariableResponseDto {
    id: string;
    name: string;
    type: string;
    required: boolean;
}
export declare class TemplateVersionResponseDto {
    id: string;
    version: number;
    status: string;
    subject?: string;
    body: string;
    variables: TemplateVariableResponseDto[];
    createdAt: Date;
}
export declare class TemplateResponseDto {
    id: string;
    code: string;
    name: string;
    description?: string;
    channel: string;
    versions: TemplateVersionResponseDto[];
    createdAt: Date;
}
//# sourceMappingURL=template-responses.dto.d.ts.map