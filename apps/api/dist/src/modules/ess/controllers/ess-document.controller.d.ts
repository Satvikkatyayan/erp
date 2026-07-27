import { EmployeeDocumentService } from '../services/employee-document.service';
export declare class EssDocumentController {
    private readonly documentService;
    constructor(documentService: EmployeeDocumentService);
    viewDocument(documentId: string, req: any): Promise<{
        success: boolean;
    }>;
    downloadDocument(documentId: string, req: any): Promise<{
        success: boolean;
        downloadUrl: string;
    }>;
    acknowledge(documentId: string, req: any): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=ess-document.controller.d.ts.map