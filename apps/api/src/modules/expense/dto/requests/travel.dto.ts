import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateTravelRequestDto {
  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsString()
  purpose: string;
}

export class UpdateTravelDto {
  @ApiProperty()
  @IsString()
  destination: string;
}
