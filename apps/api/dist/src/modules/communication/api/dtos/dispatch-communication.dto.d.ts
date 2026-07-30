import { Channel } from '../../domain/channel.enum';
export declare class DispatchCommunicationDto {
    tenantId: string;
    recipient: string;
    channel: Channel;
    templateCode: string;
    payload?: Record<string, any>;
}
//# sourceMappingURL=dispatch-communication.dto.d.ts.map