export class TravelDetailDto {
  travelId: string;
  employeeId: string;
  destination: string;
  purpose: string;
  startDate: Date;
  endDate: Date;
  status: string;
  estimatedCost: number;
  itinerary: any[];
}
