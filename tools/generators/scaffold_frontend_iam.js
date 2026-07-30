const fs = require('fs');
const path = require('path');

const WEB_IAM_DIR = 'd:\\erpvvinfratech\\apps\\web\\components\\iam';

if (!fs.existsSync(WEB_IAM_DIR)) {
    fs.mkdirSync(WEB_IAM_DIR, { recursive: true });
}

const components = {
    'RequirePermission.tsx': `
import React from 'react';
// import { useIAM } from '@/hooks/useIAM';

interface Props {
  permission: string | string[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequirePermission({ permission, requireAll = true, children, fallback = null }: Props) {
  // const { hasPermission } = useIAM();
  // const hasIt = Array.isArray(permission) 
  //    ? (requireAll ? permission.every(hasPermission) : permission.some(hasPermission))
  //    : hasPermission(permission);
  
  const hasIt = true; // Placeholder until hook is implemented

  if (!hasIt) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
`,
    'RequireFeature.tsx': `
import React from 'react';
// import { useIAM } from '@/hooks/useIAM';

interface Props {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireFeature({ feature, children, fallback = null }: Props) {
  // const { isFeatureEnabled } = useIAM();
  // const enabled = isFeatureEnabled(feature);
  
  const enabled = true; // Placeholder

  if (!enabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
`,
    'RequirePolicy.tsx': `
import React from 'react';
// import { useIAM } from '@/hooks/useIAM';

interface Props {
  policy: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequirePolicy({ policy, children, fallback = null }: Props) {
  // Policies usually require backend evaluation, but some client-side caching of policy booleans could exist.
  // const { checkPolicy } = useIAM();
  const passed = true; // Placeholder

  if (!passed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
`,
    'RequireScope.tsx': `
import React from 'react';

interface Props {
  scope: string; // e.g. 'ORGANIZATION', 'SELF'
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireScope({ scope, children, fallback = null }: Props) {
  const passed = true; // Placeholder

  if (!passed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
`,
    'RequireApproval.tsx': `
import React from 'react';

interface Props {
  workflowId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireApproval({ workflowId, children, fallback = null }: Props) {
  const passed = true; // Placeholder

  if (!passed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
`
};

for (const [file, content] of Object.entries(components)) {
    fs.writeFileSync(path.join(WEB_IAM_DIR, file), content.trim());
}

console.log('Frontend IAM components scaffolded.');
