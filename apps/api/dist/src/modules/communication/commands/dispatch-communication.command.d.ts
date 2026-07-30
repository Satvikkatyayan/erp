import { Channel } from '../domain/channel.enum';
export declare class DispatchCommunicationCommand {
    readonly tenantId: string;
    readonly recipient: string;
    readonly channel: Channel;
    readonly templateCode: string;
    readonly payload: Record<string, any>;
    constructor(tenantId: string, recipient: string, channel: Channel, templateCode: string, payload: Record<string, any>);
}
//# sourceMappingURL=dispatch-communication.command.d.ts.map