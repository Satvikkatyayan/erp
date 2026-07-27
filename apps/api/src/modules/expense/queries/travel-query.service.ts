import { Injectable } from '@nestjs/common';

@Injectable()
export class TravelQueryService {
  async getTravelRequest(travelId: string): Promise<any> {}
  async getTravelHistory(employeeId: string): Promise<any[]> { return []; }
  async getUpcomingTravel(employeeId: string): Promise<any[]> { return []; }
  async getTravelSettlement(travelId: string): Promise<any> {}
  async getTravelDashboard(employeeId: string): Promise<any> {}
}
