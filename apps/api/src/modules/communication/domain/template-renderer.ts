export class TemplateRenderer {
  public render(subject: string, body: string, payload: Record<string, any>): { renderedSubject: string; renderedBody: string } {
    const renderedSubject = this.interpolate(subject, payload);
    const renderedBody = this.interpolate(body, payload);

    return {
      renderedSubject,
      renderedBody,
    };
  }

  private interpolate(template: string, payload: Record<string, any>): string {
    if (!template) return '';
    return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, variableName) => {
      const value = payload[variableName];
      return value !== undefined && value !== null ? String(value) : match;
    });
  }
}
