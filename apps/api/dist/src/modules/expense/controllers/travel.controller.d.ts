import { ExpenseFacade } from '../facades/expense.facade';
import { TravelMapper } from '../mappers/travel.mapper';
import { CreateTravelRequestDto, UpdateTravelDto } from '../dto/requests/travel.dto';
import { CommandResponse } from '../dto/responses/standard.response';
export declare class TravelController {
    private readonly facade;
    private readonly mapper;
    constructor(facade: ExpenseFacade, mapper: TravelMapper);
    createTravel(dto: CreateTravelRequestDto): Promise<CommandResponse>;
    updateTravel(id: string, dto: UpdateTravelDto): Promise<CommandResponse>;
    submitTravel(id: string): Promise<CommandResponse>;
    cancelTravel(id: string): Promise<CommandResponse>;
    attachBookings(id: string, dto: any): Promise<CommandResponse>;
    requestAdvance(id: string, dto: any): Promise<CommandResponse>;
}
//# sourceMappingURL=travel.controller.d.ts.map