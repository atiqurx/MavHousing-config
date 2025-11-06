import { Controller, Get } from '@nestjs/common';
import { InternalApiService } from './internal-api.service';

@Controller()
export class InternalApiController {
  constructor(private readonly internalApiService: InternalApiService) {}

  @Get()
  getHello(): string {
    return this.internalApiService.getHello();
  }
}
