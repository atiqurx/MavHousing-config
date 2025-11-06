import { Module } from '@nestjs/common';
import { InternalApiController } from './internal-api.controller';
import { InternalApiService } from './internal-api.service';

@Module({
  imports: [],
  controllers: [InternalApiController],
  providers: [InternalApiService],
})
export class InternalApiModule {}
