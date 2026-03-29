import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';

const isProduction = process.env.NODE_ENV !== 'development';
const productionUrl = process.env.RENDER_EXTERNAL_URL || process.env.PROD_URL || '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: isProduction ? {origin: productionUrl} : false,
  });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
