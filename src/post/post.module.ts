import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Post ] ) ],
  providers: [ PostService ],
  controllers: [ PostController ]
} )
export class PostModule { }
