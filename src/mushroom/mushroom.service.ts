import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Mushroom } from 'src/interfaces/mushroom';
import { MushroomItem } from './mushroom-item.entity';

@Injectable()
export class MushroomService {
  //   constructor(
  //     @Inject(forwardRef(() => MushroomService))
  //     private mushroomService: MushroomService,
  //   ) {}

  async getMushrooms() {
    return await MushroomItem.find();
  }

  async createDummyMushrooms(): Promise<MushroomItem[]> {
    const newMushroom = new MushroomItem();
    newMushroom.namePL = 'Podgrzybek brunatny';
    newMushroom.scientificName = 'Imleria badia';

    await newMushroom.save();

    const newMushroom2 = new MushroomItem();
    newMushroom2.namePL = 'Podgrzybek zajączek';
    newMushroom2.scientificName = 'Boletus subtomentosus';

    await newMushroom2.save();

    return [newMushroom, newMushroom2];
  }
}
