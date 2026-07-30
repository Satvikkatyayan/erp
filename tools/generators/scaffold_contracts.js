const fs = require('fs');
const path = require('path');

const CONTRACTS_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\contracts';

const directories = [
    path.join(CONTRACTS_DIR, 'events'),
    path.join(CONTRACTS_DIR, 'dtos'),
    path.join(CONTRACTS_DIR, 'integrations')
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(CONTRACTS_DIR, 'events', 'workflow.events.ts')]: `
export interface WorkflowCompletedEvent {
  workflowId: string;
  status: "APPROVED" | "REJECTED";
  completedAt: string;
}
`,
    [path.join(CONTRACTS_DIR, 'events', 'reporting.events.ts')]: `
export interface ReportGeneratedEvent {
  reportId: string;
  snapshotHash: string;
  generatedAt: string;
}
`,
    [path.join(CONTRACTS_DIR, 'dtos', 'pagination.dto.ts')]: `
export interface PaginationDTO {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
`,
    [path.join(CONTRACTS_DIR, 'integrations', 'integration.contracts.ts')]: `
export interface OutboundPayloadVersionV1 {
  version: '1.0';
  sourceSystem: string;
  payload: any;
}
`,
    [path.join(CONTRACTS_DIR, 'index.ts')]: `
export * from './events/workflow.events';
export * from './events/reporting.events';
export * from './dtos/pagination.dto';
export * from './integrations/integration.contracts';
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Contract Registry scaffolded successfully.');
