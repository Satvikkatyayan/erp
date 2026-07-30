import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TemplateVariableResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  required: boolean;
}

export class TemplateVersionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  subject?: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ type: [TemplateVariableResponseDto] })
  variables: TemplateVariableResponseDto[];

  @ApiProperty()
  createdAt: Date;
}

export class TemplateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  channel: string;

  @ApiProperty({ type: [TemplateVersionResponseDto] })
  versions: TemplateVersionResponseDto[];

  @ApiProperty()
  createdAt: Date;
}
