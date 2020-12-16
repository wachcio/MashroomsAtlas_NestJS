import { IsDataURI, IsString, IsUUID } from 'class-validator';

export class ImageDto {
  imageName: string;

  @IsUUID()
  mushroomId: string;
}
