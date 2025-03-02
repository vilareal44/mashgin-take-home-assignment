import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap the NestJS application
 *
 */
async function bootstrap() {
  const port = process.env.PORT ?? 3001;
  const app = await NestFactory.create(AppModule, { cors: true });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Mashgin take home API')
    .setDescription('The Mashgin menu API documentation')
    .setVersion('1.0')
    .addTag('menu', 'Menu related endpoints')
    .addTag('order', 'Order related endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  Logger.log(`Server is running on port ${port}`);
  Logger.log(`Swagger docs is available on http://localhost:${port}/api/docs`);
}
void bootstrap();
