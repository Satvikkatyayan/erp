import { IsString, IsNotEmpty, IsOptional, IsObject, IsDateString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignmentDataDto {
  @ApiProperty({ description: 'Department ID' })
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({ description: 'Role ID' })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @ApiPropertyOptional({ description: 'Manager ID' })
  @IsUUID()
  @IsOptional()
  managerId?: string;
}

export class OnboardingDataDto {
  @ApiProperty({ description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email address' })
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class OnboardEmployeeRequestDto {
  @ApiProperty({ description: 'Data for onboarding', type: () => OnboardingDataDto })
  @ValidateNested()
  @Type(() => OnboardingDataDto)
  @IsNotEmpty()
  data: OnboardingDataDto;
}

export class JoinEmployeeRequestDto {}

export class TransferEmployeeRequestDto {
  @ApiProperty({ description: 'New assignment data for transfer', type: () => AssignmentDataDto })
  @ValidateNested()
  @Type(() => AssignmentDataDto)
  @IsNotEmpty()
  newAssignmentData: AssignmentDataDto;
}

export class PromoteEmployeeRequestDto {
  @ApiProperty({ description: 'New assignment data for promotion', type: () => AssignmentDataDto })
  @ValidateNested()
  @Type(() => AssignmentDataDto)
  @IsNotEmpty()
  newAssignmentData: AssignmentDataDto;
}

export class ResignEmployeeRequestDto {
  @ApiProperty({ description: 'Date of resignation', example: '2026-08-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  resignationDate: string;
}

export class TerminateEmployeeRequestDto {
  @ApiProperty({ description: 'Date of termination', example: '2026-08-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  terminationDate: string;
}

export class ExitEmployeeRequestDto {
  @ApiProperty({ description: 'Exit date', example: '2026-08-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  exitDate: string;
}

export class RehireEmployeeRequestDto {
  @ApiProperty({ description: 'Initial assignment data for rehiring', type: () => AssignmentDataDto })
  @ValidateNested()
  @Type(() => AssignmentDataDto)
  @IsNotEmpty()
  initialAssignmentData: AssignmentDataDto;
}

export class ConfirmEmployeeRequestDto {
  @ApiProperty({ description: 'ID of the user confirming the employee' })
  @IsUUID()
  @IsNotEmpty()
  confirmedBy: string;

  @ApiProperty({ description: 'Date of confirmation', example: '2026-08-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  confirmedAt: string;
}
