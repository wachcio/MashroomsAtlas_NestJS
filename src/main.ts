import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('ENV: ', process.env); // 'local'
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );
  console.log('NODE_ENV: ', process.env.NODE_ENV); // 'local'

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
