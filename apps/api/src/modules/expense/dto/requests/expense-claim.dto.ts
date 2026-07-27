import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExpenseClaimDto {
  @ApiProperty()
  @IsString()
  employeeId: string;

  @ApiProperty()
  @IsString()
  departmentId: string;
}

export class UpdateExpenseClaimDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string;
}

export class SubmitExpenseDto {
  @ApiProperty()
  @IsString()
  claimId: string;
}

export class CancelExpenseDto {
  @ApiProperty()
  @IsString()
  claimId: string;
}

export class AddExpenseItemDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  category: string;
}

export class RemoveExpenseItemDto {
  @ApiProperty()
  @IsString()
  itemId: string;
}

export class UploadReceiptDto {
  @ApiProperty()
  @IsString()
  fileUrl: string;
}
