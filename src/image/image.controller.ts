import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageDto } from './dto/image.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { multerStorage, storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/count/:id')
  async getImagesCount(@Param('id') id: string, @Res() res: any): Promise<any> {
    return this.imageService.getImagesCount(id, res);
  }

  @Get('/:mushroomId/:imageNumber')
  async getImage(
    @Param('mushroomId') mushroomId: string,
    @Param('imageNumber') imageNumber: number,
    @Res() res: any,
  ): Promise<any> {
    return this.imageService.getImage(mushroomId, imageNumber - 1, res);
  }

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'mushroom-photos')) },
    ),
  )
  create(
    @Body() ImageDto: ImageDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ) {
    return this.imageService.create(ImageDto, files);
  }

  @Get('/mushroom')
  findAll() {
    return this.imageService.findAll();
  }

  @Get('/mushroom/:mushroomId')
  findOne(@Param('mushroomId') mushroomId: string) {
    return this.imageService.findOne(mushroomId);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateImage: Image) {
  //   return this.imageService.update(+id, updateImage);
  // }

  @Delete('/:mushroomId/:imageNumber')
  remove(
    @Param('mushroomId') mushroomId: string,
    @Param('imageNumber') imageNumber: number,
  ) {
    return this.imageService.remove(mushroomId, imageNumber);
  }
}
