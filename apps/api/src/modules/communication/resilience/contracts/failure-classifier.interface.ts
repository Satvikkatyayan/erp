export interface FailureClassifierInterface {
  isTransient(errorCode: string): boolean;
}
