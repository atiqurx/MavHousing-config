import { Module } from '@nestjs/common';
import { CommsServerController } from './comms-server.controller';
import { CommsServerService } from './comms-server.service';

@Module({
  imports: [],
  controllers: [CommsServerController],
  providers: [CommsServerService],
})
export class CommsServerModule {}
