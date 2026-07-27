import { Controller, Post, Param, Req, UseGuards } from '@nestjs/common';
import { EmployeeDocumentService } from '../services/employee-document.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('ess/documents')
@UseGuards(JwtAuthGuard)
export class EssDocumentController {
  constructor(
    private readonly documentService: EmployeeDocumentService
  ) {}

  @Post(':id/view')
  async viewDocument(@Param('id') documentId: string, @Req() req: any) {
    const ctx = req.context;
    const ip = req.ip;
    const ua = req.headers['user-agent'];
    return this.documentService.viewDocument(ctx, documentId, ip, ua);
  }

  @Post(':id/download')
  async downloadDocument(@Param('id') documentId: string, @Req() req: any) {
    const ctx = req.context;
    const ip = req.ip;
    const ua = req.headers['user-agent'];
    return this.documentService.downloadDocument(ctx, documentId, ip, ua);
  }

  @Post(':id/acknowledge')
  async acknowledge(@Param('id') documentId: string, @Req() req: any) {
    const ctx = req.context;
    const ip = req.ip;
    const ua = req.headers['user-agent'];
    return this.documentService.acknowledgePolicy(ctx, documentId, null, ip, ua);
  }
}
