import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpenseQueryMapper {
  toResponse(entity: any) {
    return { ...entity };
  }
}
