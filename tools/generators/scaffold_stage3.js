const fs = require('fs');
const path = require('path');

const RULES_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\rules';

const directories = [
    path.join(RULES_DIR, 'evaluator'),
    path.join(RULES_DIR, 'commands'),
    path.join(RULES_DIR, 'queries'),
    path.join(RULES_DIR, 'sdk'),
    path.join(RULES_DIR, 'analysis'),
    path.join(RULES_DIR, 'api'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(RULES_DIR, 'evaluator', 'decision-table.engine.ts')]: `
import { Injectable, ConflictException } from '@nestjs/common';
import { JsonAstEvaluator } from '../../workflow/evaluator/json-ast-evaluator.service';

@Injectable()
export class DecisionTableEngine {
  constructor(private readonly ast: JsonAstEvaluator) {}

  evaluate(tableDefinition: any, context: Record<string, any>, hitPolicy = 'FIRST_MATCH') {
    const trace = [];
    const matchedRows = [];
    
    // tableDefinition.rows looks like:
    // [ { conditions: [...], outputs: { PL: 15 } } ]
    
    for (const row of tableDefinition.rows || []) {
       const isMatch = this.ast.evaluate(row.conditions, context);
       trace.push({ rowId: row.id, matched: isMatch, evaluatedConditions: row.conditions });
       
       if (isMatch) {
         matchedRows.push(row);
         if (hitPolicy === 'FIRST_MATCH') {
            break;
         }
       }
    }
    
    if (hitPolicy === 'UNIQUE' && matchedRows.length > 1) {
       throw new ConflictException('UNIQUE hit policy violated: Multiple rules matched.');
    }
    
    // Compile outputs based on matched rows
    const outputs = {};
    if (hitPolicy === 'COLLECT') {
       // Merge into arrays
       matchedRows.forEach(r => {
         Object.keys(r.outputs).forEach(k => {
           if (!outputs[k]) outputs[k] = [];
           outputs[k].push(r.outputs[k]);
         });
       });
    } else {
       // Single or Last-write wins for ANY/PRIORITY
       matchedRows.forEach(r => Object.assign(outputs, r.outputs));
    }
    
    return { outputs, trace, matchedRows };
  }
}
`,
    [path.join(RULES_DIR, 'commands', 'rule-command.service.ts')]: `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { EventBusService } from '../../events/event-bus.service';

@Injectable()
export class RuleCommandService {
  constructor(private prisma: PrismaService, private eventBus: EventBusService) {}
  
  async publishVersion(ruleSetId: string, versionData: any) {
    // Validate dependencies via RuleDependencyAnalyzer before saving
    // Insert new version
    // Invalidate Cache via event RuleCacheInvalidated
  }
}
`,
    [path.join(RULES_DIR, 'queries', 'rule-evaluation.service.ts')]: `
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DecisionTableEngine } from '../evaluator/decision-table.engine';

@Injectable()
export class RuleEvaluationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private decisionEngine: DecisionTableEngine
  ) {}

  async evaluate(ruleSetKey: string, context: any) {
    const cacheKey = \`rule:\${ruleSetKey}:latest\`;
    let definition = await this.cacheManager.get(cacheKey);
    let wasCached = true;
    
    if (!definition) {
      // Fetch from DB (Mocked here)
      definition = { hitPolicy: 'UNIQUE', rows: [] };
      await this.cacheManager.set(cacheKey, definition, 3600000); // 1 hour
      wasCached = false;
    }
    
    const startTime = Date.now();
    const result = this.decisionEngine.evaluate(definition, context, definition.hitPolicy as string);
    const durationMs = Date.now() - startTime;
    
    return {
      outputs: result.outputs,
      trace: result.trace,
      metrics: { durationMs, wasCached }
    };
  }
}
`,
    [path.join(RULES_DIR, 'sdk', 'platform-rule.sdk.ts')]: `
import { Injectable } from '@nestjs/common';
import { RuleEvaluationService } from '../queries/rule-evaluation.service';
import { RuleCommandService } from '../commands/rule-command.service';

/**
 * Public SDK for business modules.
 */
@Injectable()
export class PlatformRuleSDK {
  constructor(
    private evaluateService: RuleEvaluationService,
    private commandService: RuleCommandService
  ) {}

  async evaluate(ruleSetKey: string, payload: any) {
    return this.evaluateService.evaluate(ruleSetKey, payload);
  }
  
  async simulate(ruleSetKey: string, payload: any) {
    // Same as evaluate but doesn't write audit DB records
    return this.evaluateService.evaluate(ruleSetKey, payload);
  }
}
`,
    [path.join(RULES_DIR, 'analysis', 'rule-analyzer.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class RuleAnalyzerService {
  detectCycles(graph: any) {
    // Topological sort check for circular rule chains
    return false;
  }
  
  analyzeImpact(ruleSetId: string) {
    // Determine which workflows and modules are bound to this rule
    return {
      affectedWorkflows: ['ExpenseApproval', 'LeaveRequest'],
      affectedModules: ['Finance', 'HR']
    };
  }
}
`,
    [path.join(RULES_DIR, 'api', 'rule.controller.ts')]: `
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PlatformRuleSDK } from '../sdk/platform-rule.sdk';
import { RuleAnalyzerService } from '../analysis/rule-analyzer.service';

@Controller('api/v1/rules')
export class RuleController {
  constructor(
    private sdk: PlatformRuleSDK,
    private analyzer: RuleAnalyzerService
  ) {}

  @Post('evaluate/:key')
  async evaluate(@Param('key') key: string, @Body() payload: any) {
    return this.sdk.evaluate(key, payload);
  }
  
  @Post('simulate/:key')
  async simulate(@Param('key') key: string, @Body() payload: any) {
    return this.sdk.simulate(key, payload);
  }

  @Get(':id/impact')
  async getImpact(@Param('id') id: string) {
    return this.analyzer.analyzeImpact(id);
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 3 BRE files scaffolded.');
