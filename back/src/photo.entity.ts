import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Prompt } from './prompt.entity';
import { UserInfo } from './userinfo.entity';

@Entity()
@Unique(['id'])
export class Photo {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  url: string;

  @Column()
  author: string;

  @Column({ type: 'json' })
  rawMetadata: object;

  @Column({ default: false })
  nsfw: boolean;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'text' })
  generator: string;

  @Column({ type: 'datetime' })
  createDate: Date;

  @ManyToMany(() => Prompt, (tag) => tag.photos, {
    cascade: ['insert'],
  })
  @JoinTable()
  prompt: Prompt[];

  @ManyToMany(() => UserInfo, (user) => user.favs, {
    cascade: ['insert'],
  })
  @JoinTable()
  favUser: UserInfo[];
}
