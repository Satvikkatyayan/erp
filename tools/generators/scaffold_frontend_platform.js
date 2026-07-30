const fs = require('fs');
const path = require('path');

const WEB_PLATFORM_DIR = 'd:\\erpvvinfratech\\apps\\web\\components\\platform';

if (!fs.existsSync(WEB_PLATFORM_DIR)) {
    fs.mkdirSync(WEB_PLATFORM_DIR, { recursive: true });
}

const components = {
    'DynamicFormBuilder.tsx': `
import React from 'react';

export function DynamicFormBuilder() {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-medium">Dynamic Form Builder</h3>
      <p className="text-sm text-gray-500">Drag and drop fields to build forms dynamically based on FormDefinition.</p>
    </div>
  );
}
`,
    'DynamicFormRenderer.tsx': `
import React from 'react';

export function DynamicFormRenderer({ formId }: { formId: string }) {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-medium">Form Renderer (ID: {formId})</h3>
      <p className="text-sm text-gray-500">Renders inputs based on DB configuration.</p>
    </div>
  );
}
`,
    'ReportViewer.tsx': `
import React from 'react';

export function ReportViewer({ reportId }: { reportId: string }) {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-medium">Report Viewer (ID: {reportId})</h3>
      <p className="text-sm text-gray-500">Displays dynamic table and charts based on ReportTemplate.</p>
    </div>
  );
}
`,
    'WorkflowTimeline.tsx': `
import React from 'react';

export function WorkflowTimeline({ instanceId }: { instanceId: string }) {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-medium">Workflow Timeline</h3>
      <p className="text-sm text-gray-500">Visualizes Draft -> Submitted -> Approved for instance {instanceId}.</p>
    </div>
  );
}
`,
    'TaskBoard.tsx': `
import React from 'react';

export function TaskBoard() {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-medium">My Tasks</h3>
      <p className="text-sm text-gray-500">Kanban view of WorkflowTasks assigned to the current user.</p>
    </div>
  );
}
`
};

for (const [file, content] of Object.entries(components)) {
    fs.writeFileSync(path.join(WEB_PLATFORM_DIR, file), content.trim());
}

console.log('Frontend platform components scaffolded.');
