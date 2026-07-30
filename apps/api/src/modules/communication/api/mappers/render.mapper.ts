import { Injectable } from '@nestjs/common';
import { RenderResult } from '../../services/template-rendering.service';
import { RenderResponseDto } from '../dtos/render-responses.dto';

@Injectable()
export class RenderMapper {
  mapToResponseDto(result: RenderResult): RenderResponseDto {
    return {
      renderedSubject: result.renderedSubject,
      renderedBody: result.renderedBody,
      templateVersionId: result.templateVersionId,
      renderingWarnings: result.renderingWarnings,
    };
  }

  success<T>(data: T, message: string = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }
}
