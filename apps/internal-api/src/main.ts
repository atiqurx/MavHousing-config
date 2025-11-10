import { NestFactory } from '@nestjs/core';
import { InternalApiModule } from './internal-api.module';

async function bootstrap() {
  const app = await NestFactory.create(InternalApiModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
