import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MushroomItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: '255',
  })
  namePL: string;

  @Column()
  scientificName: string;
}
