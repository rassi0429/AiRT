import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Prompt } from './prompt.entity';
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
    @InjectRepository(Prompt)
    private promptRepository: Repository<Prompt>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async getPhotoByUserId(uid: string, nsfw: boolean) {
    console.log('getPhotoByUserId', uid);
    const photos = await this.photoRepository.find({
      where: { author: uid },
      relations: ['prompt'],
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
      relations: ['prompt'],
    });
    if (nsfw) {
      return photo;
    } else {
      return this.excludensfw([photo])[0];
    }
  }

  async getCountInfo(uid: string) {
    const photo = await this.photoRepository.count({ where: { author: uid } });
    return { photo };
  }

  async getPhotoByTag(
    tag: string,
    order?: string,
    limit = 0,
    page = 0,
    nsfw = false,
  ) {
    const result = await this.promptRepository.findOne({
      where: { name: tag },
      relations: [`photos`, `photos.prompt`],
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
    const result = await this.promptRepository.find();
    return result;
  }

  async updatePhotoById(id, comment, tags) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    const newTags = [];
    for (const item of tags) {
      const t = await this.promptRepository.findOne({ name: item });
      if (t) {
        newTags.push(t);
      } else {
        const newTag = new Prompt();
        newTag.name = item;
        const tag = await this.promptRepository.save(newTag);
        newTags.push(tag);
      }
    }
    photo.comment = comment;
    photo.prompt = newTags;
    return this.photoRepository.save(photo);
  }

  async toggleFavo(id, uid) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    if (photo) {
      const user = await this.userInfoRepository.findOne({
        where: { uid },
        relations: ['favs'],
      });
      if (user) {
        if (user.favs.filter((f) => f.id === photo.id).length >= 1) {
          user.favs = user.favs.filter((f) => f.id !== photo.id);
        } else {
          user.favs.push(photo);
        }
        await this.userInfoRepository.save(user);
        return true;
      }
    }
    return false;
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
      const tag = this.promptRepository.findOne({ where: { name: 'NULL' } });
      photos = await this.photoRepository.find({
        take: limit,
        skip: limit * page,
        where: { tags: In([tag]) },
        relations: ['prompt'],
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
        relations: ['prompt'],
        order: {
          id: 'DESC',
        },
      });
    } else {
      photos = await this.photoRepository.find({
        take: limit,
        skip: limit * page,
        relations: ['prompt'],
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
    return photos.filter((p) => {
      return !p.nsfw;
    });
  }

  async addPhoto(
    url: string,
    comment: string,
    author: string,
    prompt: string[],
    rawMetadata: object,
    nsfw: boolean,
    generator: string,
  ) {
    const newPhoto = new Photo();
    newPhoto.url = url;
    newPhoto.comment = comment;
    newPhoto.author = author;
    newPhoto.createDate = new Date();
    newPhoto.prompt = [];
    newPhoto.rawMetadata = rawMetadata;
    newPhoto.nsfw = nsfw;
    newPhoto.generator = generator;
    for (const item of prompt) {
      const t = await this.promptRepository.findOne({ name: item });
      if (t) {
        newPhoto.prompt.push(t);
      } else {
        const newTag = new Prompt();
        newTag.name = item;
        const tag = await this.promptRepository.save(newTag);
        newPhoto.prompt.push(tag);
      }
    }
    return this.photoRepository.save(newPhoto);
  }

  async deletePhoto(id: number) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    return this.photoRepository.remove(photo);
  }

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
    return this.userInfoRepository.findOne({
      where: { uid },
      relations: ['favs', 'favs.prompt'],
    });
  }
}
