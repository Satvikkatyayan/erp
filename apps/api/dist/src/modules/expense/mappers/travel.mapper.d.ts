import { CreateTravelRequestDto, UpdateTravelDto } from '../dto/requests/travel.dto';
export declare class TravelMapper {
    toCreateCommand(dto: CreateTravelRequestDto): {
        destination: string;
        purpose: string;
    };
    toUpdateCommand(id: string, dto: UpdateTravelDto): {
        destination: string;
        id: string;
    };
    toResponse(entity: any): any;
}
//# sourceMappingURL=travel.mapper.d.ts.map