import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Prompt } from './prompt.entity';
import { UserInfo } from './userinfo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Photo, Prompt, UserInfo]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
