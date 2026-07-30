import { IsString, IsNotEmpty, IsUUID, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeaveDateRangeDto {
  @ApiProperty({ description: 'Start date of the leave' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End date of the leave' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

export class ApplyLeaveRequestDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ description: 'Leave Type ID' })
  @IsUUID()
  @IsNotEmpty()
  leaveTypeId: string;

  @ApiProperty({ description: 'Date Range for Leave' })
  @ValidateNested()
  @Type(() => LeaveDateRangeDto)
  @IsNotEmpty()
  dateRange: LeaveDateRangeDto;

  @ApiPropertyOptional({ description: 'Reason for leave' })
  @IsString()
  @IsOptional()
  reason?: string;
}

export class ApproveLeaveRequestDto {
  @ApiPropertyOptional({ description: 'Manager comments' })
  @IsString()
  @IsOptional()
  comments?: string;
}

export class RejectLeaveRequestDto {
  @ApiProperty({ description: 'Reason for rejection' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class CancelLeaveRequestDto {
  @ApiPropertyOptional({ description: 'Reason for cancellation' })
  @IsString()
  @IsOptional()
  reason?: string;
}
