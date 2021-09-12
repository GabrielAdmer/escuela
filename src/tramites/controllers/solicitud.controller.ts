import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SolicitudService } from '../services/solicitud.service';
import { UpdateSolicitudDto, CreateSolicitudDto, FilterSolicitud } from '../dtos/solicitud.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IsPublic } from '../../auth/decorators/ispublic.decorator';


@UseGuards( JwtAuthGuard )
@ApiTags( 'Solicitudes' )
@Controller( 'solicitud' )
export class SolicitudController {

  constructor(
    private solicitudService: SolicitudService
  ) { };

  @Get()
  findAll(
    @Query() params: FilterSolicitud
  ) {
    return this.solicitudService.findAll( params );
  };

  @IsPublic()
  @Get( ':id' )
  findOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.solicitudService.findOne( id );
  };

  @IsPublic()
  @Post()
  createOne(
    @Body() data: CreateSolicitudDto
  ) {
    return this.solicitudService.createOne( data );
  };

  @Put( ':id' )
  updateOne(
    @Body() changes: UpdateSolicitudDto, @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.solicitudService.updateOne( id, changes );
  };

  @Delete( ':id' )
  removeOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.solicitudService.removeOne( id );
  }


}
