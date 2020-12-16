import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // 'local'
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.get(
        'VALIDATION_PIPE_DISABLE_ERROR_MESSAGES',
      ),
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Mushroom atlas')
    .setDescription('Mushroom atlas API')
    .setVersion('1.0')
    .addTag('mushroom')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
