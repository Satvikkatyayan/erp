import { Injectable } from '@nestjs/common';
import { CommunicationHistoryDto } from '../dtos/responses.dto';

@Injectable()
export class CommunicationMapper {
  success<T>(data: T, message: string = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  mapToHistoryDto(record: any): CommunicationHistoryDto {
    return {
      id: record.id,
      channel: record.channel,
      recipient: record.recipient,
      subject: record.subject,
      body: record.body,
      status: record.status,
      provider: record.provider,
      createdAt: record.createdAt,
    };
  }

  mapToHistoryDtoList(records: any[]): CommunicationHistoryDto[] {
    return records.map((record) => this.mapToHistoryDto(record));
  }
}
