import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';

export class SubmitPayrollReviewApprovalDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;

  @IsNotEmpty()
  @IsUUID()
  reviewId: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}