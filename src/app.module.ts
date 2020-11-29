import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MushroomModule } from './mushroom/mushroom.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MushroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
