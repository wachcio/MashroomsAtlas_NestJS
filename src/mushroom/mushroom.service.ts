import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  Mushroom,
  MushroomDescriptionInterface,
} from 'src/interfaces/mushroom';
import { MushroomDescription } from './mushroom-description.entity';
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

  async createMushroom(
    mushroom: MushroomItem,
    mushroomDescription: MushroomDescription,
  ): Promise<MushroomItem> {
    const newMushroomDescription = new MushroomDescription();
    newMushroomDescription.occurrence = mushroomDescription.occurrence;
    newMushroomDescription.dimensions = mushroomDescription.dimensions;
    newMushroomDescription.cap = mushroomDescription.cap;
    newMushroomDescription.underCap = mushroomDescription.underCap;
    newMushroomDescription.capImprint = mushroomDescription.capImprint;
    newMushroomDescription.stem = mushroomDescription.stem;
    newMushroomDescription.flesh = mushroomDescription.flesh;
    newMushroomDescription.characteristics =
      mushroomDescription.characteristics;
    newMushroomDescription.possibleConfusion =
      mushroomDescription.possibleConfusion;
    newMushroomDescription.comments = mushroomDescription.comments;
    newMushroomDescription.value = mushroomDescription.value;
    newMushroomDescription.frequency = mushroomDescription.frequency;

    await newMushroomDescription.save();

    const newMushroom = new MushroomItem();
    newMushroom.polishName = mushroom.polishName;
    newMushroom.scientificName = mushroom.scientificName;
    newMushroom.anotherNames = mushroom.anotherNames;
    newMushroom.application = mushroom.application;
    newMushroom.isLegallyProtected = mushroom.isLegallyProtected;
    newMushroom.approvedForTrade = mushroom.approvedForTrade;
    newMushroom.images = mushroom.images;

    await newMushroom.save();

    newMushroom.id = mushroom.id;
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
