import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AssignCorporateCardDto {
  @ApiProperty()
  @IsString()
  employeeId: string;

  @ApiProperty()
  @IsNumber()
  limit: number;
}

export class ImportStatementDto {
  @ApiProperty()
  @IsString()
  fileUrl: string;
}
