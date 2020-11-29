import { Mushroom, MushroomApplication } from 'src/interfaces/mushroom';
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
export class MushroomItem extends BaseEntity implements Mushroom {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: '255',
  })
  polishName: string;

  @Column()
  scientificName: string;

  @Column()
  anotherNames: string;

  @Column({
    type: 'smallint',
  })
  application: MushroomApplication;

  @Column()
  isLegallyProtected: boolean;

  @Column()
  approvedForTrade: boolean;

  @Column()
  images: string;

  @OneToOne(() => MushroomDescription)
  @JoinColumn()
  description: MushroomDescription;

  // @Column({
  //   type: 'json',
  // })
  // description: MushroomDescription;
}
