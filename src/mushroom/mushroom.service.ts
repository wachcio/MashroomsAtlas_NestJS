import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Mushroom } from 'src/interfaces/mushroom';
import { MushroomItem } from './mushroom-item.entity';

@Injectable()
export class MushroomService {
  //   constructor(
  //     @Inject(forwardRef(() => MushroomService))
  //     private mushroomService: MushroomService,
  //   ) {}

  async getMushrooms(): Promise<MushroomItem[]> {
    return MushroomItem.find();
  }

  async createMushroom(mushroom: MushroomItem): Promise<MushroomItem> {
    const newMushroom = new MushroomItem();
    newMushroom.polishName = mushroom.polishName;
    newMushroom.scientificName = mushroom.scientificName;
    await newMushroom.save();

    return newMushroom;
  }

  async createDummyMushrooms(): Promise<MushroomItem[]> {
    const newMushroom = new MushroomItem();
    newMushroom.polishName = 'Podgrzybek brunatny';
    newMushroom.scientificName = 'Imleria badia';

    await newMushroom.save();

    const newMushroom2 = new MushroomItem();
    newMushroom2.polishName = 'Podgrzybek zajączek';
    newMushroom2.scientificName = 'Boletus subtomentosus';

    await newMushroom2.save();

    return [newMushroom, newMushroom2];
  }
}
