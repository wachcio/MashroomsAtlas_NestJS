import { Injectable } from '@nestjs/common';
import { Mushroom } from 'src/interfaces/mushroom';

@Injectable()
export class MushroomService {
  getMushroom(mushroom: Mushroom) {
    return mushroom;
  }
}
