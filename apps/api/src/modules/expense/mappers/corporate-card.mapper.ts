import { Injectable } from '@nestjs/common';
import { AssignCorporateCardDto, ImportStatementDto } from '../dto/requests/corporate-card.dto';

@Injectable()
export class CorporateCardMapper {
  toAssignCommand(dto: AssignCorporateCardDto) {
    return { ...dto };
  }

  toImportCommand(dto: ImportStatementDto) {
    return { ...dto };
  }

  toResponse(entity: any) {
    return { ...entity };
  }
}
