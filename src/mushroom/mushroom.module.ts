import { Module } from '@nestjs/common';
import { MushroomService } from './mushroom.service';
import { MushroomController } from './mushroom.controller';

@Module({
  providers: [MushroomService],
  controllers: [MushroomController]
})
export class MushroomModule {}
