import { ExpenseFacade } from '../facades/expense.facade';
import { CorporateCardMapper } from '../mappers/corporate-card.mapper';
import { AssignCorporateCardDto, ImportStatementDto } from '../dto/requests/corporate-card.dto';
import { CommandResponse } from '../dto/responses/standard.response';
export declare class CorporateCardController {
    private readonly facade;
    private readonly mapper;
    constructor(facade: ExpenseFacade, mapper: CorporateCardMapper);
    assignCard(dto: AssignCorporateCardDto): Promise<CommandResponse>;
    importStatement(dto: ImportStatementDto): Promise<CommandResponse>;
    reconcileCard(id: string, dto: any): Promise<CommandResponse>;
    closeReconciliation(id: string): Promise<CommandResponse>;
}
//# sourceMappingURL=corporate-card.controller.d.ts.map