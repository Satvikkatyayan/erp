export class APIResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
  timestamp: string;
  requestId: string;
}
