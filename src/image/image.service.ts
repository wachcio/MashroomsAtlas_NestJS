import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from 'src/interceptors/files';
import { Image } from './entities/image.entity';
import * as fs from 'fs';
import * as path from 'path';
import { mushroomImagePath } from 'src/utils/imagePath';
import { MushroomItem } from 'src/mushroom/mushroom-item.entity';

@Injectable()
export class ImageService {
  async getImagesCount(id: string, res: any) {
    try {
      res.send({ count: await Image.count({ mushroomId: id }) });
    } catch (e) {
      res.json({
        error: e.message,
      });
    }
  }

  async getImage(id: string, imageNumber: number, res: any) {
    try {
      const one = await Image.find({ mushroomId: id });

      if (!one[imageNumber]) {
        throw new Error('No image found!');
      }

      res.sendFile(one[imageNumber].imageName, {
        root: mushroomImagePath,
      });
    } catch (e) {
      res.json({
        error: e.message,
      });
    }
  }

  async create(image, files: MulterDiskUploadedFiles): Promise<Image> {
    const photo = files?.photo?.[0] ?? null;

    try {
      const newImage = new Image();

      newImage.mushroomId = image.mushroomId;

      if (photo) {
        newImage.imageName = photo.filename;
      }

      await newImage.save();

      const imagesCount = await Image.count({ mushroomId: image.mushroomId });
      console.log(imagesCount);

      const newMushroom = await MushroomItem.findOne({ id: image.mushroomId });
      newMushroom.images = imagesCount;
      newMushroom.save();

      return newImage;
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(path.join(mushroomImagePath, photo.filename));
        }
      } catch (e2) {}

      throw e;
    }
  }

  async findAll() {
    return await Image.find();
  }

  async findOne(mushroomId: string) {
    return Image.find({ mushroomId });
  }

  // async update(id: number, Image: Image) {
  //   return `This action updates a #${id} image`;
  // }

  async remove(id: string, imageNumber: number) {
    const image = await Image.find({ mushroomId: id });

    if (!image[imageNumber - 1]) {
      throw new HttpException(`No image found!`, HttpStatus.NOT_FOUND);
    }

    try {
      if (image) {
        fs.unlinkSync(
          path.join(mushroomImagePath, image[imageNumber - 1].imageName),
        );

        await Image.delete(image[imageNumber - 1].id);

        const imagesCount = await Image.count({ mushroomId: id });
        console.log(imagesCount);

        const newMushroom = await MushroomItem.findOne(id);
        newMushroom.images = imagesCount;
        newMushroom.save();
      }
    } catch (e) {
      throw new HttpException(`No image found!`, HttpStatus.NOT_FOUND);
    }
  }
}
