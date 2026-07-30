# 11 ENTERPRISE COMMUNICATION READINESS

## 1. Purpose
A centralized platform service to orchestrate all outbound communications (Email, SMS, In-App Notifications, Push). It acts as the single source of truth for message templates, delivery logs, and routing preferences.

## 2. Boundaries and Ownership
- **Owns**: Message Templates, Notification Logs, User Communication Preferences.
- **Does Not Own**: Business logic dictating *when* to send a message. That remains in the respective modules (e.g., Leave Module decides when to email a manager).

## 3. Consumers
Every business module will eventually consume this service. Initial primary consumers will be Recruitment (Offer Letters, Interview Invites) and Leave (Approval workflows).

## 4. Required SDK
`PlatformCommunicationSDK`
- `send(payload: CommunicationRequestDto): Promise<void>`
- `getDeliveryStatus(messageId: string): Promise<DeliveryStatusDto>`

## 5. Communication Flow
1. **Trigger**: Module Execution Service publishes an event (e.g., `leave.applied`).
2. **Listener**: Module's own event handler decides an email is needed and constructs the data payload.
3. **Dispatch**: Module calls `PlatformCommunicationSDK.send(payload)`.
4. **Execution**: Communication Service resolves the template, renders it, and queues it for asynchronous delivery via a provider (e.g., SES).
5. **Log**: Service writes to `NotificationLog` repository.

## 6. Future Extensibility
The architecture allows swapping underlying providers (e.g., moving from SendGrid to AWS SES) entirely within the Communication Service, requiring absolutely zero changes to the Employee, Leave, or Recruitment modules.
