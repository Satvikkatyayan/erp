import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetRegisteredProvidersQuery } from '../queries/get-registered-providers.query';
import { ProviderMapper } from '../api/mappers/provider.mapper';

@ApiTags('Communication Provider Management')
@Controller('communication/providers')
export class ProviderQueryController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly providerMapper: ProviderMapper
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list of registered providers and their capabilities' })
  async getRegisteredProviders() {
    const result = await this.queryBus.execute(new GetRegisteredProvidersQuery());
    return this.providerMapper.success(
      this.providerMapper.mapToResponseDto(result),
      'Registered providers retrieved successfully'
    );
  }
}
