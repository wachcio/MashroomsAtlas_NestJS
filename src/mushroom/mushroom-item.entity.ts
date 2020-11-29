import { Mushroom, MushroomApplication } from 'src/interfaces/mushroom';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  descriptionID: string;

  // @Column({
  //   type: 'json',
  // })
  // description: MushroomDescription;
}
