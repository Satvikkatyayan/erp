export class ApiErrorDto {
  statusCode: number;
  error: string;
  message: string | string[];
  validationErrors?: any[];
  timestamp: string;
  requestId: string;
  path: string;
}