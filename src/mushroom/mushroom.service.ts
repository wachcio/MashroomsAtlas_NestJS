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

  async createMushroom(mushroom: MushroomItem): Promise<MushroomItem> {
    const newMushroom = new MushroomItem();
    newMushroom.namePL = mushroom.namePL;
    newMushroom.scientificName = mushroom.scientificName;
    await newMushroom.save();

    return newMushroom;
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
