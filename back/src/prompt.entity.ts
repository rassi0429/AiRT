import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @ManyToMany((type) => Photo, (photo) => photo.prompt)
  photos: Photo[];
}
