import { CommunicationHistoryDto } from '../dtos/responses.dto';
export declare class CommunicationMapper {
    success<T>(data: T, message?: string): {
        success: boolean;
        message: string;
        data: T;
    };
    mapToHistoryDto(record: any): CommunicationHistoryDto;
    mapToHistoryDtoList(records: any[]): CommunicationHistoryDto[];
}
//# sourceMappingURL=communication.mapper.d.ts.map