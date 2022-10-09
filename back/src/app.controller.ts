import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import admin, { firestore } from 'firebase-admin';
import { AccountGuard } from './account.guard';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cloudflare } = require('../credentials/secrets.json');
import { Headers } from '@nestjs/common';
import { ToBoolean } from './toboolean';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max } from 'class-validator';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const j2e = require('json2emap');

class PhotosDTO {
  limit?: number;
  page?: number;
  tags?: string[];
  uid?: string;
  @ToBoolean()
  emap?: boolean;
  @ToBoolean()
  nsfw?: boolean;
}

class CreatePhotosDTO {
  url: string;
  comment: string;
  tags: string;
}

class UpdatePhotoDTO {
  comment: string;
  tags: string[];
}

class CreateMomentDTO {
  title: string;
  photos: number[];
}

class emapDTO {
  @ToBoolean()
  emap?: boolean;
  @ToBoolean()
  nsfw?: boolean;
}

class tagQueryDTO {
  @ToBoolean()
  emap?: boolean;
  @Transform((value) => {
    return Number(value.value) || 0;
  })
  @IsOptional()
  limit?: number;
  @Transform((value) => {
    return Number(value.value) || 0;
  })
  @IsOptional()
  page?: number;
  @IsString()
  @IsOptional()
  order?: string;
  @ToBoolean()
  nsfw?: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('v1/imageReq')
  @UseGuards(AccountGuard)
  async requestImageUpload(): Promise<string> {
    const directUploadUrl = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${cloudflare.id}/images/v2/direct_upload`,
      null,
      { headers: { Authorization: `Bearer ${cloudflare.key}` } },
    );
    return directUploadUrl.data;
  }

  @Get('v1/photos')
  async getPhotos(@Query() photosDTO: PhotosDTO) {
    const data = await this.appService.getPhotos(
      photosDTO.limit || 50,
      photosDTO.page || 0,
      photosDTO.tags || [],
      photosDTO.uid || null,
      photosDTO.nsfw || false,
    );
    return photosDTO.emap ? j2e(JSON.parse(JSON.stringify(data))) : data;
  }

  @Post('v1/photo')
  @UseGuards(AccountGuard)
  async addPhoto(
    @Headers('token') token: string,
    @Body() create: CreatePhotosDTO,
  ) {
    const data = await admin.auth().verifyIdToken(token);
    return this.appService.addPhoto(
      create.url,
      create.comment,
      data.uid,
      JSON.parse(create.tags),
    );
  }

  @Get('v1/photo/:id')
  async getPhoto(@Param('id') id: number, @Query() query: emapDTO) {
    if (!id) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      return;
    }
    const photo = await this.appService.getPhotoById(id, query.nsfw);
    if (!photo) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
      return;
    }
    return query.emap ? j2e(JSON.parse(JSON.stringify(photo))) : photo;
  }

  @Post('v1/photo/:id')
  @UseGuards(AccountGuard)
  async updatePhoto(
    @Param('id') id: number,
    @Headers('token') token: string,
    @Body() updatePhoto: UpdatePhotoDTO,
  ) {
    const { uid } = await admin.auth().verifyIdToken(token);
    const photo = await this.appService.getPhotoById(id, true);
    if (photo.author !== uid) {
      throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
      return;
    }
    return this.appService.updatePhotoById(
      id,
      updatePhoto.comment,
      updatePhoto.tags,
    );
  }

  @Delete('v1/photo/:id')
  @UseGuards(AccountGuard)
  async deletePhoto(@Param('id') id: number, @Headers('token') token: string) {
    const { uid } = await admin.auth().verifyIdToken(token);
    const photo = await this.appService.getPhotoById(id, true);
    if (photo.author !== uid) {
      throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
      return;
    }
    return this.appService.deletePhoto(id);
  }

  @Get('v1/tag/:id')
  async getPhotoByTag(@Param('id') id: string, @Query() query: tagQueryDTO) {
    const data = await this.appService.getPhotoByTag(
      id,
      query.order || 'DESC',
      query.limit,
      query.page,
      query.nsfw,
    );
    if (!data) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    return query.emap ? j2e(JSON.parse(JSON.stringify(data))) : data;
  }

  @Get('v1/tags')
  async getTags(@Query() query: emapDTO) {
    const data = await this.appService.getTags();
    return query.emap ? j2e(JSON.parse(JSON.stringify(data))) : data;
  }

  @Post('v1/user')
  @UseGuards(AccountGuard)
  async updateUserInfo(@Headers('token') token: string, @Body() body) {
    console.log('user data update');
    const user = await admin.auth().verifyIdToken(token);
    return await this.appService.updateUserInfo(
      user.user_id,
      user.firebase.identities['twitter.com'][0],
      body.displayName,
      body.photoURL,
    );
  }

  @Get('v1/user/:id')
  async getUserInfo(@Param('id') userId: string, @Query() query: emapDTO) {
    const user = await this.appService.getUserInfo(userId);
    console.log(user);
    if (!user) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    const countInfo = await this.appService.getCountInfo(userId);
    const data = { user, countInfo };
    return query.emap ? j2e(JSON.parse(JSON.stringify(data))) : data;
  }

  @Get('v1/user/:id/photos')
  async getUserPhotoData(@Param('id') userid, @Query() query: emapDTO) {
    const data = this.appService.getPhotoByUserId(userid, query.nsfw);
    return query.emap ? j2e(JSON.parse(JSON.stringify(data))) : data;
  }
}
