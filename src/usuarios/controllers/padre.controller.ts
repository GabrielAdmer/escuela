import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PadreService } from '../services/padre.service';
import { CreatePadreDto, UpdatePadreDto } from '../dtos/padre.dto';

@ApiTags( 'Padres' )
@Controller( 'padres' )
export class PadreController {

  constructor(
    private padreService: PadreService
  ) { };

  @Get()
  findAll() {
    return this.padreService.findAll();
  };

  @Get( ':id' )
  findOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.padreService.findOne( id );
  };

  @Post()
  createOne(
    @Body() data: CreatePadreDto
  ) {
    return this.padreService.createOne( data );
  };

  @Put( ':id' )
  updateOne(
    @Body() changes: UpdatePadreDto, @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.padreService.updateOne( id, changes );
  };

  @Delete( ':id' )
  removeOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.padreService.removeOne( id );
  }

}
