export declare class DeliveryFailedEvent {
    readonly correlationId: string;
    readonly tenantId: string;
    readonly channel: string;
    readonly stage: string;
    readonly errorCode: string;
    readonly errorMessage: string;
    constructor(correlationId: string, tenantId: string, channel: string, stage: string, errorCode: string, errorMessage: string);
}
//# sourceMappingURL=delivery-failed.event.d.ts.map