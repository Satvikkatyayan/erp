import { Injectable } from '@nestjs/common';
import { TemplateResponseDto, TemplateVersionResponseDto, TemplateVariableResponseDto } from '../dtos/template-responses.dto';

@Injectable()
export class TemplateMapper {
  success<T>(data: T, message: string = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  mapToTemplateDto(record: any): TemplateResponseDto {
    if (!record) return null;
    return {
      id: record.id,
      code: record.code,
      name: record.name,
      description: record.description,
      channel: record.channel,
      createdAt: record.createdAt,
      versions: record.versions ? record.versions.map((v: any) => this.mapToVersionDto(v)) : [],
    };
  }

  mapToVersionDto(record: any): TemplateVersionResponseDto {
    if (!record) return null;
    return {
      id: record.id,
      version: record.version,
      status: record.status,
      subject: record.subject,
      body: record.body,
      createdAt: record.createdAt,
      variables: record.variables ? record.variables.map((v: any) => this.mapToVariableDto(v)) : [],
    };
  }

  mapToVariableDto(record: any): TemplateVariableResponseDto {
    if (!record) return null;
    return {
      id: record.id,
      name: record.name,
      type: record.type,
      required: record.required,
    };
  }

  mapToTemplateDtoList(records: any[]): TemplateResponseDto[] {
    return records.map((record) => this.mapToTemplateDto(record));
  }
}
