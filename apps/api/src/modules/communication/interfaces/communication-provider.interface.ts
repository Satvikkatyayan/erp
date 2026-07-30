export interface CommunicationProvider {
  send(payload: any): Promise<void>;
}
