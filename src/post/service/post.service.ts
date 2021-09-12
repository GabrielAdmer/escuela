import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from '../dtos/post .dto';
import { Post } from '../entity/post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository( Post ) private postRespo: Repository<Post>
  ) { }

  findAll() {
    return this.postRespo.find();
  }

  async findOne( id: number ) {
    const post = await this.postRespo.findOne( id );
    if ( !post ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }
    return post;
  }

  async createOne( data: CreatePostDto ) {
    const newPost = this.postRespo.create( data );
    return this.postRespo.save( newPost );
  }

  async updateOne( id: number, changes: UpdatePostDto ) {
    const post = await this.findOne( id );
    this.postRespo.merge( post, changes );
    return this.postRespo.save( post );
  }

  async deleteOne( id: number ) {
    const post = await this.findOne( id );
    return this.postRespo.remove( post );
  }
}
