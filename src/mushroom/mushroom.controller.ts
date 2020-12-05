import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { MushroomDto } from './dto/mushroom.dto';
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

  @Get('/:searchText')
  findMushrooms(
    @Param('searchText') searchText: string,
  ): Promise<MushroomItem[]> {
    return this.mushroomService.findMushrooms(searchText);
  }

  @Post('/')
  createMushroom(@Body() newMushroom: MushroomItem) {
    return this.mushroomService.createMushroom(newMushroom);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteMushroom(@Param('id') id: string) {
    return this.mushroomService.deleteMushroom(id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateMushroom: MushroomItem,
  ): Promise<UpdateResult> {
    return this.mushroomService.updateMushroom(id, updateMushroom);
  }

  @Get('/createDummyMushrooms')
  createDummyMushrooms() {
    return this.mushroomService.createDummyMushrooms();
  }
}
