import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MushroomModule } from './mushroom/mushroom.module';

@Module({
  imports: [MushroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
