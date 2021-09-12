import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto, UpdatePostDto } from '../dtos/post .dto';

@Controller( 'post' )
export class PostController {

  constructor(
    private postService: PostService
  ) { }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get( ':id' )
  findOne( @Param( 'id', ParseIntPipe ) id: number ) {
    return this.postService.findOne( id );
  }

  @Post()
  createOne(
    @Body() data: CreatePostDto
  ) {
    return this.postService.createOne( data );
  }

  @Put( ':id' )
  updateOne(
    @Body() changes: UpdatePostDto, @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.postService.updateOne( id, changes );
  }

  @Delete( ':id' )
  removeOne(
    @Param( ':id' ) id: number
  ) {
    console.log( id );
    return this.postService.deleteOne( id );
  }
}
