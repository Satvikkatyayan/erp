import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ApproveExpenseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comments?: string;
}

export class RejectExpenseDto {
  @ApiProperty()
  @IsString()
  reason: string;
}
