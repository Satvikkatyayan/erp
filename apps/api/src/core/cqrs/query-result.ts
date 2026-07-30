export class QueryResult<T> {
  constructor(
    public readonly data: T,
    public readonly metadata?: any,
    public readonly errors?: any[]
  ) {}

  static success<T>(data: T, metadata?: any): QueryResult<T> {
    return new QueryResult(data, metadata);
  }

  static failure<T>(errors: any[]): QueryResult<T> {
    return new QueryResult<T>(null as any, undefined, errors);
  }
}
