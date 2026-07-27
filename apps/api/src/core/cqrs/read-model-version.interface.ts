export interface ReadModelVersion {
  projectionId: string;
  projectionType: string;
  version: number;
  generatedAt: Date;
  lastEventId: string;
  lastSequenceNumber: number;
}
