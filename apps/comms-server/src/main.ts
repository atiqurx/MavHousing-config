import { NestFactory } from '@nestjs/core';
import { CommsServerModule } from './comms-server.module';

async function bootstrap() {
  const app = await NestFactory.create(CommsServerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
