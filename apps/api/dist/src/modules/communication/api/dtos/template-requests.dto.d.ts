export declare class TemplateVariableDto {
    name: string;
    type: string;
    required?: boolean;
}
export declare class CreateTemplateRequestDto {
    code: string;
    name: string;
    description?: string;
    channel: string;
    subject?: string;
    body: string;
    variables: TemplateVariableDto[];
}
//# sourceMappingURL=template-requests.dto.d.ts.map