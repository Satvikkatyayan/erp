export interface TransitionValidator {
  validate(transition: any, context: any): Promise<boolean>;
}