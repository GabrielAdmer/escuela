import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AsistenciaService } from '../services/asistencia.service';
import { CreateAsistenciaDto, FilterFechaDto, UpdateAsistenciaDto } from '../dtos/asistencia.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/rol.guard';
import { Roles } from 'src/auth/decorators/rol.decorator';
import { RolEnum } from 'src/auth/models/rol.model';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';

@UseGuards( JwtAuthGuard, RolesGuard )
@Controller( 'asistencia' )
export class AsistenciaController {

  constructor(
    private asistenciaService: AsistenciaService
  ) { }

  @Roles( RolEnum.PROFESOR, RolEnum.ADMIN, RolEnum.DIRECTIVO )
  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get( 'fecha' )
  porFechas(
    @Query() fechas: FilterFechaDto
  ) {
    return this.asistenciaService.porFecha( fechas.inicio, fechas.fin );
  }

  //@Roles( RolEnum.PROFESOR, RolEnum.ADMIN, RolEnum.PROFESOR )
  @Get( ':id' )
  finOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.asistenciaService.finOne( id );
  }

  // @Roles( RolEnum.ADMIN, RolEnum.DIRECTIVO, RolEnum.PROFESOR )
  @Post()
  createOne(
    @Body() data: CreateAsistenciaDto
  ) {
    return this.asistenciaService.createOne( data );
  }

  //@Roles( RolEnum.ADMIN, RolEnum.DIRECTIVO, RolEnum.PROFESOR )
  @Put( ':id' )
  updateOne(
    @Body() changes: UpdateAsistenciaDto, @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.asistenciaService.updateOne( id, changes );
  }

}
