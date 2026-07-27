export declare class FormSubmissionEngine {
    private readonly logger;
    processSubmission(formId: string, payload: any, action: 'AUTOSAVE' | 'SUBMIT'): Promise<{
        status: string;
        submissionId: string;
        version: number;
    } | {
        status: string;
        submissionId: string;
        version?: undefined;
    }>;
}
//# sourceMappingURL=submission.engine.d.ts.map