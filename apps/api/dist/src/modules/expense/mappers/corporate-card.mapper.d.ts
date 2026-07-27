import { AssignCorporateCardDto, ImportStatementDto } from '../dto/requests/corporate-card.dto';
export declare class CorporateCardMapper {
    toAssignCommand(dto: AssignCorporateCardDto): {
        employeeId: string;
        limit: number;
    };
    toImportCommand(dto: ImportStatementDto): {
        fileUrl: string;
    };
    toResponse(entity: any): any;
}
//# sourceMappingURL=corporate-card.mapper.d.ts.map