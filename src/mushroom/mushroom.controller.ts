import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MushroomDescription } from './mushroom-description.entity';
import { MushroomItem } from './mushroom-item.entity';
import { MushroomService } from './mushroom.service';

@Controller('mushroom')
export class MushroomController {
  constructor(
    @Inject(MushroomService) private mushroomService: MushroomService,
  ) {}
  @Get('/')
  getMushrooms() {
    return this.mushroomService.getMushrooms();
  }

  @Post('/')
  createMushroom(@Body() newMushroom: MushroomItem) {
    return this.mushroomService.createMushroom(newMushroom);
  }

  @Get('/createDummyMushrooms')
  createDummyMushrooms() {
    return this.mushroomService.createDummyMushrooms();
  }
}
