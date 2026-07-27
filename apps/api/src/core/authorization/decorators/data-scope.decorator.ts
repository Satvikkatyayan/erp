import { SetMetadata } from '@nestjs/common';
export const DATA_SCOPE_KEY = 'dataScope';
export const RequireDataScope = (module: string) => SetMetadata(DATA_SCOPE_KEY, module);