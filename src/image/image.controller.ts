import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageDto } from './dto/image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() ImageDto: ImageDto) {
    return this.imageService.create(ImageDto);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':mushroomId')
  findOne(@Param('mushroomId') mushroomId: string) {
    return this.imageService.findOne(mushroomId);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateImage: Image) {
  //   return this.imageService.update(+id, updateImage);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
