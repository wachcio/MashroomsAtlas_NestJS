import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  async create(image): Promise<Image> {
    const newImage = new Image();

    newImage.mushroomId = image.mushroomId;
    return await newImage.save();
  }

  async findAll() {
    return await Image.find();
  }

  async findOne(mushroomId: string) {
    return Image.find({ mushroomId });
  }

  async update(id: number, Image: Image) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
