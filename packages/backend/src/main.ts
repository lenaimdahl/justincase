import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';

const isProduction = process.env.NODE_ENV !== 'development';
const frontendURL = process.env.FRONTEND_URL || '';
const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors({
    credentials: true,
    origin: isProduction ? frontendURL : true,
  });
  app.setGlobalPrefix('');

  const config = new DocumentBuilder()
    .setTitle('JustInCase API')
    .setDescription('API documentation for the JustInCase backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('_swagger', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  logger.debug(`Server started on port ${process.env.PORT ?? 3000}`);
  if (isProduction) {
    logger.debug(`CORS enabled for origin: ${frontendURL}`);
  } else {
    logger.debug('CORS disabled for development');
  }
}
bootstrap();
