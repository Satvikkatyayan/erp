import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class SubmitPayrollReviewRejectionDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;

  @IsNotEmpty()
  @IsUUID()
  reviewId: string;

  @IsNotEmpty()
  @IsString()
  remarks: string;
}