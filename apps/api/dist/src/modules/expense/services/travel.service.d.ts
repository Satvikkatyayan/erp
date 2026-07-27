import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ITravelRepository } from '../interfaces/repository.interfaces';
export declare class TravelService {
    private readonly context;
    private readonly travelRepo;
    constructor(context: ExpenseDomainContext, travelRepo: ITravelRepository);
    requestTravel(payload: any): Promise<any>;
    addItinerary(travelId: string, itinerary: any): Promise<any>;
    addBookingReference(travelId: string, ref: string): Promise<any>;
    completeTravel(travelId: string): Promise<any>;
    linkExpenseClaim(travelId: string, claimId: string): Promise<any>;
}
//# sourceMappingURL=travel.service.d.ts.map