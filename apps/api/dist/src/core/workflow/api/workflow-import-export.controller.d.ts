export declare class WorkflowImportExportController {
    export(id: string): Promise<{
        workflowHash: string;
        definition: {
            id: string;
            states: any[];
        };
    }>;
    import(payload: any): Promise<{
        status: string;
        importedId: string;
        hashVerified: boolean;
    }>;
}
//# sourceMappingURL=workflow-import-export.controller.d.ts.map