export declare class ProcessedEventStore {
    private processedEvents;
    isProcessed(eventId: string, handlerId: string): Promise<boolean>;
    markAsProcessed(eventId: string, handlerId: string): Promise<void>;
}
//# sourceMappingURL=processed-event.store.d.ts.map