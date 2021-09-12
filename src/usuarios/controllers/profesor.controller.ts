import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProfesorService } from '../services/profesor.service';
import { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/rol.guard';
import { Roles } from 'src/auth/decorators/rol.decorator';
import { RolEnum } from 'src/auth/models/rol.model';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';

@UseGuards( JwtAuthGuard, RolesGuard )
@Controller( 'profesor' )
export class ProfesorController {

  constructor(
    private profesorService: ProfesorService
  ) { };

  @IsPublic()
  @Get()
  findAll() {
    return this.profesorService.findAll();
  };

  @Roles( RolEnum.ADMIN )
  @Get( ':id' )
  findOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.profesorService.findOne( id );
  };

  @Roles( RolEnum.ADMIN )
  @Post()
  createOne(
    @Body() data: CreateProfesorDto
  ) {
    return this.profesorService.createOne( data );
  };

  @Roles( RolEnum.ADMIN )
  @Put( ':id' )
  updateOne(
    @Body() changes: UpdateProfesorDto, @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.profesorService.updateOne( id, changes );
  };

  @Roles( RolEnum.ADMIN )
  @Delete( ':id' )
  removeOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.profesorService.removeOne( id );
  }

}
