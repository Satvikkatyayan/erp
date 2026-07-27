import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateResolver {
  resolveVersion(templateCode: string): any {
    // Mock fetching active version
    return {
      versionId: 'v123',
      content: '{{> header}} <h1>{{employee.name}}</h1> {{> footer}}'
    };
  }
  
  resolvePartials(templateCode: string): Record<string, string> {
    return {
      'header': '<header>Company Header</header>',
      'footer': '<footer>Company Footer</footer>'
    };
  }
}