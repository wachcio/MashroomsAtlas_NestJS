import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MushroomModule } from './mushroom/mushroom.module';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.env.development'
          : '.env.production',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [process.env.TYPEORM_ENTITIES],
      logging: Boolean(process.env.TYPEORM_LOGGING),
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      bigNumberStrings: Boolean(process.env.TYPEORM_BIG_NUMBER_STRING),
      // dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA),
      // cache: Boolean(process.env.TYPEORM_CACHE),
    }),
    MushroomModule,
    UserModule,
    AuthModule,
    ImageModule,
    ConsoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
