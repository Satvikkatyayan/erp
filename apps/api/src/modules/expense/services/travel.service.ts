import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ITravelRepository, TRAVEL_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class TravelService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(TRAVEL_REPOSITORY_TOKEN) private readonly travelRepo: ITravelRepository
  ) {}

  async requestTravel(payload: any): Promise<any> {
    const ctx = this.context.getContext();
    await this.travelRepo.createRequest(payload);
    return { status: 'TRAVEL_REQUESTED', employeeId: ctx.employee.id };
  }

  async addItinerary(travelId: string, itinerary: any): Promise<any> {
    return { status: 'ITINERARY_ADDED', travelId };
  }

  async addBookingReference(travelId: string, ref: string): Promise<any> {
    return { status: 'BOOKING_REF_ADDED', travelId };
  }

  async completeTravel(travelId: string): Promise<any> {
    return { status: 'TRAVEL_COMPLETED', travelId };
  }

  async linkExpenseClaim(travelId: string, claimId: string): Promise<any> {
    return { status: 'CLAIM_LINKED', travelId, claimId };
  }
}
