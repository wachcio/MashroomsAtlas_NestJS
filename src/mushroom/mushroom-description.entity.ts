import { MushroomDescriptionInterface } from 'src/interfaces/mushroom';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MushroomDescription
  extends BaseEntity
  implements MushroomDescriptionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  occurrence: string;

  @Column()
  dimensions: string;

  @Column()
  cap: string;

  @Column()
  underCap: string;

  @Column()
  capImprint: string;

  @Column()
  stem: string;

  @Column()
  flesh: string;

  @Column()
  characteristics: string;

  @Column()
  possibleConfusion: string;

  @Column()
  value: string;

  @Column()
  comments: string;

  @Column()
  frequency: string;

  @OneToOne(() => MushroomDescription)
  description: MushroomDescription;
}
