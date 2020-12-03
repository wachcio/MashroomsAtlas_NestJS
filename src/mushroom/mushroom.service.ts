import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { identity } from 'rxjs';
import {
  MushroomDto,
  MushroomDescriptionDto,
} from 'src/mushroom/dto/mushroom.dto';
import { Like } from 'typeorm';
import { MushroomDescription } from './mushroom-description.entity';
import { MushroomItem } from './mushroom-item.entity';

@Injectable()
export class MushroomService {
  //   constructor(
  //     @Inject(forwardRef(() => MushroomService))
  //     private mushroomService: MushroomService,
  //   ) {}

  async getAllMushrooms(): Promise<MushroomItem[]> {
    return MushroomItem.find({
      relations: ['description'],
    });
  }

  async findMushrooms(searchText: string): Promise<MushroomItem[]> {
    return MushroomItem.find({
      where: [
        { id: searchText },
        { polishName: Like(`%${searchText}%`) },
        { scientificName: Like(`%${searchText}%`) },
        { anotherNames: Like(`%${searchText}%`) },
        { application: Like(`%${searchText}%`) },
      ],
      relations: ['description'],
    });
  }

  async createMushroom(mushroom): Promise<MushroomItem> {
    const newMushroom = new MushroomItem();
    const newMushroomDescription = new MushroomDescription();
    newMushroomDescription.occurrence = mushroom.occurrence;
    newMushroomDescription.dimensions = mushroom.dimensions;
    newMushroomDescription.cap = mushroom.cap;
    newMushroomDescription.underCap = mushroom.underCap;
    newMushroomDescription.capImprint = mushroom.capImprint;
    newMushroomDescription.stem = mushroom.stem;
    newMushroomDescription.flesh = mushroom.flesh;
    newMushroomDescription.characteristics = mushroom.characteristics;
    newMushroomDescription.possibleConfusion = mushroom.possibleConfusion;
    newMushroomDescription.comments = mushroom.comments;
    newMushroomDescription.value = mushroom.value;
    newMushroomDescription.frequency = mushroom.frequency;

    await newMushroomDescription.save();

    newMushroom.polishName = mushroom.polishName;
    newMushroom.scientificName = mushroom.scientificName;
    newMushroom.anotherNames = mushroom.anotherNames;
    newMushroom.application = mushroom.application;
    newMushroom.isLegallyProtected = mushroom.isLegallyProtected;
    newMushroom.approvedForTrade = mushroom.approvedForTrade;
    newMushroom.images = mushroom.images;

    await newMushroom.save();

    newMushroom.description = newMushroomDescription;
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
