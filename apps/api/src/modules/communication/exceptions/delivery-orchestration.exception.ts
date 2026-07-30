export class DeliveryOrchestrationException extends Error {
  constructor(message: string) {
    super(`Delivery Orchestration Failed: ${message}`);
    this.name = 'DeliveryOrchestrationException';
  }
}
