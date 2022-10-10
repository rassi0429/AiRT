import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
} from 'typeorm';
import { Photo } from './photo.entity';
@Entity()
@Unique(['id'])
export class UserInfo {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  uid: string;

  @Column({ type: 'text' })
  name: string;

  @Column()
  twitterId: string;

  @Column({ default: '' })
  neosId: string;

  @Column({ type: 'text' })
  twitterImage: string;

  @ManyToMany((type) => Photo, (photo) => photo.favUser)
  favs: Photo[];
}
