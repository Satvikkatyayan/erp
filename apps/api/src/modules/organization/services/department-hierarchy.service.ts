import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ValidationError } from '../../../core/contracts/errors/platform.error';

@Injectable()
export class DepartmentHierarchyService {
   private readonly logger = new Logger(DepartmentHierarchyService.name);

   constructor(
      private readonly prisma: PrismaService,
      private readonly platform: PlatformSDK
   ) {}

   async detectCycle(tenantId: string, departmentId: string, newParentId: string): Promise<boolean> {
      // Traverse up from newParentId to ensure departmentId is not an ancestor
      let currentId: string | null = newParentId;
      while (currentId) {
         if (currentId === departmentId) return true;
         const current = await this.prisma.department.findUnique({
            where: { id: currentId },
            select: { parentId: true }
         });
         currentId = current?.parentId || null;
      }
      return false;
   }

   async moveDepartment(ctx: PlatformContext, departmentId: string, newParentId: string) {
       return this.platform.pipeline.execute(ctx, 'OrganizationModule', 'moveDepartment', async () => {
           const isCycle = await this.detectCycle(ctx.tenantId!, departmentId, newParentId);
           if (isCycle) {
               throw new ValidationError('Cyclic reference detected in department hierarchy', ctx.correlationId, { departmentId, newParentId });
           }

           const dept = await this.prisma.department.update({
               where: { id: departmentId },
               data: { parentId: newParentId }
           });

           // Fire domain event (conceptually, we use PlatformSDK to dispatch)
           // this.platform.events.publish('DepartmentMoved', dept);

           return dept;
       });
   }
}