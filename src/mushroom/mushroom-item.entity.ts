import {
  MushroomDto,
  MushroomApplication,
} from 'src/mushroom/dto/mushroom.dto';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MushroomDescription } from './mushroom-description.entity';

@Entity()
export class MushroomItem extends BaseEntity implements MushroomDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  polishName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  scientificName: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  anotherNames: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  application: MushroomApplication;

  @Column({
    type: 'bool',
  })
  isLegallyProtected: boolean;

  @Column({
    type: 'bool',
  })
  approvedForTrade: boolean;

  // @Column({
  //   type: 'json',
  // })
  // images: string[];
  @Column({
    type: 'varchar',
    length: 2000,
  })
  images: string;

  @OneToOne(() => MushroomDescription)
  @JoinColumn()
  description: MushroomDescription;

  // @Column({
  //   type: 'json',
  // })
  // description: MushroomDescription;
}
