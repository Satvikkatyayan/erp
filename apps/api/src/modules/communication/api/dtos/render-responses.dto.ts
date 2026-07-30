import { ApiProperty } from '@nestjs/swagger';
import { RenderingWarning } from '../../domain/render-warning';

export class RenderResponseDto {
  @ApiProperty()
  renderedSubject: string;

  @ApiProperty()
  renderedBody: string;

  @ApiProperty()
  templateVersionId: string;

  @ApiProperty({ isArray: true })
  renderingWarnings: RenderingWarning[];
}
