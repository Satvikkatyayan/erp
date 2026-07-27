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