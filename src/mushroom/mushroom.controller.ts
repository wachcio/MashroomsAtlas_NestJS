import { Controller, Get, Inject } from '@nestjs/common';
import { Mushroom, MushroomList } from 'src/interfaces/mushroom';
import { MushroomService } from './mushroom.service';

@Controller('mushroom')
export class MushroomController {
  constructor(
    @Inject(MushroomService) private mushroomService: MushroomService,
  ) {}
  @Get('/')
  getMushroom(): MushroomList {
    return [
      {
        namePL: 'Podgrzybek brunatny',
        scientificName: 'Imleria badia',
      },
      {
        namePL: 'Podgrzybek zajączek',
        scientificName: 'Boletus subtomentosus',
      },
    ];
  }
}
