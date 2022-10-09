import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Tag } from './tag.entity';
import { UserInfo } from './userinfo.entity';
import { createCanvas, loadImage } from 'canvas';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FormData = require('form-data');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cloudflare } = require('../credentials/secrets.json');

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}
  //
  // async getMomentByUserId(uid: string, nsfw: boolean) {
  //   console.log('getMomentByUserId', uid);
  //   const data = await this.momentRepository.find({
  //     where: { author: uid },
  //     relations: ['photos', 'photos.tags'],
  //     order: {
  //       id: 'DESC',
  //     },
  //   });
  //   if (!nsfw) {
  //     const newdata = data.map((d) => {
  //       d.photos = this.excludensfw(d.photos);
  //       return d;
  //     });
  //     console.log(newdata);
  //     return newdata;
  //   }
  //   return data;
  // }

  async getPhotoByUserId(uid: string, nsfw: boolean) {
    console.log('getPhotoByUserId', uid);
    const photos = await this.photoRepository.find({
      where: { author: uid },
      relations: ['tags'],
      order: {
        id: 'DESC',
      },
    });
    if (!nsfw) {
      return this.excludensfw(photos);
    }
    return photos;
  }

  async getPhotoById(id: number, nsfw: boolean) {
    const photo = await this.photoRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });
    if (nsfw) {
      return photo;
    } else {
      return this.excludensfw([photo])[0];
    }
  }

  async getCountInfo(uid: string) {
    const photo = await this.photoRepository.count({ where: { author: uid } });
    // const moment = await this.momentRepository.count({
    //   where: { author: uid },
    // });
    return { photo };
  }

  async getPhotoByTag(
    tag: string,
    order?: string,
    limit = 0,
    page = 0,
    nsfw = false,
  ) {
    const result = await this.tagRepository.findOne({
      where: { name: tag },
      relations: [`photos`, `photos.tags`],
    });
    if (!result) return null;
    if (order !== 'ASC') {
      result.photos = result.photos.reverse();
    }
    if (limit || page) {
      result.photos = result.photos.slice(page * limit, (page + 1) * limit);
    }
    if (nsfw) {
      return result;
    } else {
      result.photos = this.excludensfw(result.photos);
      return result;
    }
  }

  async getTags() {
    const result = await this.tagRepository.find();
    return result;
  }

  async updatePhotoById(id, comment, tags) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    const newTags = [];
    for (const item of tags) {
      const t = await this.tagRepository.findOne({ name: item });
      if (t) {
        newTags.push(t);
      } else {
        const newTag = new Tag();
        newTag.name = item;
        const tag = await this.tagRepository.save(newTag);
        newTags.push(tag);
      }
    }
    photo.comment = comment;
    photo.tags = newTags;
    return this.photoRepository.save(photo);
  }

  async getPhotos(
    limit: number,
    page: number,
    tags: string[],
    user: string,
    nsfw: boolean,
  ) {
    let photos: Photo[] = [];
    if (tags.length !== 0) {
      console.log('tag');
      const tag = this.tagRepository.findOne({ where: { name: 'NULL' } });
      photos = await this.photoRepository.find({
        take: limit,
        skip: limit * page,
        where: { tags: In([tag]) },
        relations: ['tags'],
        order: {
          id: 'DESC',
        },
      });
    } else if (user) {
      photos = await this.photoRepository.find({
        take: limit,
        skip: limit * page,
        where: {
          author: user,
        },
        relations: ['tags'],
        order: {
          id: 'DESC',
        },
      });
    } else {
      photos = await this.photoRepository.find({
        take: limit,
        skip: limit * page,
        relations: ['tags'],
        order: {
          id: 'DESC',
        },
      });
    }
    if (!nsfw) {
      photos = this.excludensfw(photos);
    }
    return photos;
  }

  excludensfw(photos: Photo[]) {
    const nsfwTags = ['nsfw', 'r18'];
    return photos.filter((p) => {
      const tags = p.tags.map((t) => t.name.toLowerCase());
      if (tags.includes(nsfwTags[0]) || tags.includes(nsfwTags[1])) {
        return false;
      } else {
        return true;
      }
    });
  }

  async addPhoto(url: string, comment: string, author: string, tags: string[]) {
    const newPhoto = new Photo();
    newPhoto.url = url;
    newPhoto.comment = comment;
    newPhoto.author = author;
    newPhoto.createDate = new Date();
    newPhoto.tags = [];
    for (const item of tags) {
      const t = await this.tagRepository.findOne({ name: item });
      if (t) {
        newPhoto.tags.push(t);
      } else {
        const newTag = new Tag();
        newTag.name = item;
        const tag = await this.tagRepository.save(newTag);
        newPhoto.tags.push(tag);
      }
    }
    return this.photoRepository.save(newPhoto);
  }

  async deletePhoto(id: number) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    return this.photoRepository.remove(photo);
  }

  // async createMoment(title: string, author: string, photo: Photo[]) {
  //   const newMoment = new Moment();
  //   newMoment.title = title;
  //   newMoment.author = author;
  //   newMoment.photos = [...photo];
  //   return this.momentRepository.save(newMoment);
  // }

  async updateUserInfo(uid, twitterId, name, iconUrl) {
    let user = await this.userInfoRepository.findOne({ where: { uid } });
    if (!user) user = new UserInfo();
    user.uid = uid;
    user.twitterId = twitterId;
    user.name = name;
    user.twitterImage = iconUrl;
    return this.userInfoRepository.save(user);
  }

  async getUserInfo(uid) {
    return this.userInfoRepository.findOne({ where: { uid } });
  }
}
