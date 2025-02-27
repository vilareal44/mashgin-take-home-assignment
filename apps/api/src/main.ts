import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 3001;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server is running on port ${port}`);
}
void bootstrap();
