import { ApiProperty } from '@nestjs/swagger';

export class RenderTemplateRequestDto {
  @ApiProperty({ description: 'Payload containing runtime variables' })
  payload: Record<string, any>;
}
