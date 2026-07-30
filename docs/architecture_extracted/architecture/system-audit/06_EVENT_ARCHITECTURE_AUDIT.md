# 06 EVENT ARCHITECTURE AUDIT

## 1. Overview
The platform utilizes an asynchronous, decoupled Event-Driven Architecture (EDA) alongside the synchronous SDK boundaries. Events are fire-and-forget broadcasts used primarily to trigger side-effects in other domains without coupling the producer to the consumer.

## 2. Event Publishing Standards
- **Ownership**: The module that mutates the state is the sole publisher of the corresponding event.
- **Event Naming**: `[domain].[action].[status]`. All lowercase, dot-separated. (e.g., `employee.onboarded`, `leave.applied.success`).
- **Payload Standards**: 
  - Must include `tenantId`, `correlationId`, `timestamp`.
  - Must include the core entity ID (e.g., `employeeId`).
  - Should remain as lightweight as possible (event-carried state transfer is discouraged unless the state is immutable and small). Complex data should be fetched by the consumer via the SDK using the `entityId` provided in the event.

## 3. Existing Events
### Published by Employee Module
- `employee.onboarded`: Triggered upon successful profile creation.
- `employee.terminated`: Triggered when an employee exits the organization.
- `employee.promoted`: Triggered when job titles or bands change.

### Published by Leave Module
- `leave.applied`: Triggered when a new request is lodged.
- `leave.approved`: Triggered when the final approval workflow concludes.
- `leave.rejected`: Triggered upon manager rejection.
- `leave.cancelled`: Triggered when a user retracts a request.

## 4. Consumed Events
- **Leave Module**: Consumes `employee.onboarded` to automatically provision an empty `LeaveBalance` matrix for the new hire.
- **Payroll Module**: Consumes `employee.promoted` to re-calculate or provision new salary structures. Consumes `leave.approved` (if configured for continuous processing) to flag LWP adjustments.

## 5. Future Event Candidates
- **Recruitment Module**:
  - `recruitment.candidate.hired`: Could replace the manual trigger for `employee.onboarded`.
- **Communication Module**:
  - Will heavily subscribe to `leave.applied` and `leave.approved` to dispatch email notifications.
- **File Management**:
  - `file.scanned.malware_detected`: Could trigger employee profile quarantine if a malicious resume is uploaded.
