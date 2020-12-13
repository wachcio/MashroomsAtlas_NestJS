import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from 'src/interceptors/files';
import { storageDir } from 'src/utils/storage';
import { Image } from './entities/image.entity';
import * as fs from 'fs';
import * as path from 'path';

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
        root: path.join(storageDir(), 'mushroom-photos'),
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

      return await newImage.save();
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(
            path.join(storageDir(), 'mushroom-photos', photo.filename),
          );
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
          path.join(
            storageDir(),
            'mushroom-photos',
            image[imageNumber - 1].imageName,
          ),
        );
      }
    } catch (e) {
      throw new HttpException(`No image found!`, HttpStatus.NOT_FOUND);
    }

    await Image.delete(image[imageNumber - 1].id);
  }
}
