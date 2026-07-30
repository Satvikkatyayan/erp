export declare class CreateTemplateCommand {
    readonly tenantId: string;
    readonly payload: {
        code: string;
        name: string;
        description?: string;
        channel: string;
        subject?: string;
        body: string;
        variables: {
            name: string;
            type: string;
            required?: boolean;
        }[];
    };
    constructor(tenantId: string, payload: {
        code: string;
        name: string;
        description?: string;
        channel: string;
        subject?: string;
        body: string;
        variables: {
            name: string;
            type: string;
            required?: boolean;
        }[];
    });
}
//# sourceMappingURL=create-template.command.d.ts.map