import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class AssetDocumentService {
  private readonly logger = new Logger(AssetDocumentService.name);
}
