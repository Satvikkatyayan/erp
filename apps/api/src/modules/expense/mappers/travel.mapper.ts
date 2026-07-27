import { Injectable } from '@nestjs/common';
import { CreateTravelRequestDto, UpdateTravelDto } from '../dto/requests/travel.dto';

@Injectable()
export class TravelMapper {
  toCreateCommand(dto: CreateTravelRequestDto) {
    return { ...dto };
  }

  toUpdateCommand(id: string, dto: UpdateTravelDto) {
    return { id, ...dto };
  }

  toResponse(entity: any) {
    return { ...entity };
  }
}
