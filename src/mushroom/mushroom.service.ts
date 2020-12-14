import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { MushroomDescription } from './mushroom-description.entity';
import { MushroomItem } from './mushroom-item.entity';
import { Image } from '../image/entities/image.entity';

@Injectable()
export class MushroomService {
  //   constructor(
  //     @Inject(forwardRef(() => MushroomService))
  //     private mushroomService: MushroomService,
  //   ) {}
  async updateImages(item): Promise<MushroomItem[]> {
    console.log(item);

    return await Promise.all(
      item.map(async (v) => {
        v.images = await Image.count({ mushroomId: v.id });
        return await v.save();
      }),
    );
  }

  async getAllMushrooms(): Promise<MushroomItem[]> {
    const item = await MushroomItem.find({
      relations: ['description'],
    });

    return this.updateImages(item);
  }

  async getShortDataAllMushrooms(): Promise<MushroomItem[]> {
    return MushroomItem.find({
      select: [
        'id',
        'polishName',
        'scientificName',
        'anotherNames',
        'application',
      ],
    });
  }

  async findMushrooms(searchText: string): Promise<MushroomItem[]> {
    const item = await MushroomItem.find({
      where: [
        { id: searchText },
        { polishName: Like(`%${searchText}%`) },
        { scientificName: Like(`%${searchText}%`) },
        { anotherNames: Like(`%${searchText}%`) },
        { application: Like(`%${searchText}%`) },
      ],
      relations: ['description'],
    });

    return this.updateImages(item);
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

    await newMushroom.save();

    newMushroom.description = newMushroomDescription;
    await newMushroom.save();
    return newMushroom;
  }

  async deleteMushroom(id) {
    const descriptionId = await MushroomItem.findOne({
      where: [{ id }],
      relations: ['description'],
    });

    if (!descriptionId) {
      throw new HttpException(
        `I can not find mushroom id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await MushroomItem.delete(id);
    await MushroomDescription.delete({ id: descriptionId.description.id });
  }

  async updateMushroom(id, updateMushroom) {
    const descriptionId = await MushroomItem.findOne({
      where: [{ id }],
      relations: ['description'],
    });

    await MushroomDescription.update(
      descriptionId.description.id,
      updateMushroom.description,
    );
    updateMushroom.description = descriptionId.description.id;

    return await MushroomItem.update(id, updateMushroom);
  }
}
