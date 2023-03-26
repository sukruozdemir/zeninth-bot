import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startDiscord } from './discord';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  startDiscord();

  await app.listen(3000);
}
bootstrap();
