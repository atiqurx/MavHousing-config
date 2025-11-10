import { Module } from '@nestjs/common';
import { CommsServerController } from './comms-server.controller';
import { CommsServerService } from './comms-server.service';
import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule, SmsModule],
  controllers: [CommsServerController],
  providers: [CommsServerService],
})
export class CommsServerModule {}
