import { IsNotEmpty, IsUUID } from 'class-validator';

export class CalculationBreakdownQueryDto {
  @IsNotEmpty()
  @IsUUID()
  calculationId: string;
}