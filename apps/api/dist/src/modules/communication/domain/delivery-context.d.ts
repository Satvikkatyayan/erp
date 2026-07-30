import { Channel } from './channel.enum';
export declare class DeliveryContext {
    readonly tenantId: string;
    readonly recipient: string;
    readonly channel: Channel;
    readonly templateCode: string;
    readonly payload: Record<string, any>;
    readonly correlationId: string;
    constructor(tenantId: string, recipient: string, channel: Channel, templateCode: string, payload: Record<string, any>, correlationId: string);
}
//# sourceMappingURL=delivery-context.d.ts.map