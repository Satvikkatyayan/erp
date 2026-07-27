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