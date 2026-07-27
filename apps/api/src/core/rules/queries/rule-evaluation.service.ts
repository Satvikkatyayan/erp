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
    const cacheKey = `rule:${ruleSetKey}:latest`;
    let definition = await this.cacheManager.get(cacheKey) as any;
    let wasCached = true;
    
    if (!definition) {
      // Fetch from DB (Mocked here)
      definition = { hitPolicy: 'UNIQUE', rows: [] };
      await this.cacheManager.set(cacheKey, definition, 3600000); // 1 hour
      wasCached = false;
    }
    
    const startTime = Date.now();
    const result = this.decisionEngine.evaluate(definition, context, (definition as any).hitPolicy as string);
    const durationMs = Date.now() - startTime;
    
    return {
      outputs: result.outputs,
      trace: result.trace,
      metrics: { durationMs, wasCached }
    };
  }
}