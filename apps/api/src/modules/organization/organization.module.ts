import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { DepartmentHierarchyService } from './services/department-hierarchy.service';
import { OrganizationBootstrapService } from './bootstrap/organization-bootstrap.service';
import { OrganizationQueryService } from './services/organization-query.service';

@Module({
   imports: [PrismaModule],
   providers: [
      DepartmentHierarchyService,
      OrganizationBootstrapService,
      OrganizationQueryService
   ],
   exports: [DepartmentHierarchyService, OrganizationBootstrapService, OrganizationQueryService]
})
export class OrganizationModule {}