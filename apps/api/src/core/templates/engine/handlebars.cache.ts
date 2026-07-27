import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class HandlebarsCache {
  private readonly logger = new Logger(HandlebarsCache.name);
  private cache = new Map<string, HandlebarsTemplateDelegate>();

  compile(versionId: string, content: string): HandlebarsTemplateDelegate {
    if (this.cache.has(versionId)) {
      return this.cache.get(versionId);
    }
    const compiled = Handlebars.compile(content);
    this.cache.set(versionId, compiled);
    this.logger.debug(`Compiled and cached template version ${versionId}`);
    return compiled;
  }
  
  invalidate(versionId: string) {
    this.cache.delete(versionId);
  }
}