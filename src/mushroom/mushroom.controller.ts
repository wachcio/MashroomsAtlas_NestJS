import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { MushroomItem } from './mushroom-item.entity';
import { MushroomService } from './mushroom.service';

@Controller('mushroom')
export class MushroomController {
  constructor(
    @Inject(MushroomService) private mushroomService: MushroomService,
  ) {}
  @Get('/')
  getAllMushrooms(): Promise<MushroomItem[]> {
    return this.mushroomService.getAllMushrooms();
  }

  @Get('/:id')
  getOneMushroom(@Param('id') id: string): Promise<MushroomItem> {
    return this.mushroomService.getOneMushroom(id);
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
