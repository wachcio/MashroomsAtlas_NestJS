import { Controller, Get, Inject } from '@nestjs/common';
import { Mushroom, MushroomList } from 'src/interfaces/mushroom';
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

  @Get('/createDummyMushrooms')
  createDummyMushrooms() {
    return this.mushroomService.createDummyMushrooms();
  }
}
