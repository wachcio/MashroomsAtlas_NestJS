import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MushroomModule } from './mushroom/mushroom.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.env.development'
          : '.env.production',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    MushroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
