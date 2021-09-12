import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/rol.guard';
import { Roles } from 'src/auth/decorators/rol.decorator';
import { RolEnum } from 'src/auth/models/rol.model';
import { IsPublic } from '../../auth/decorators/ispublic.decorator';

@UseGuards( JwtAuthGuard, RolesGuard )
@ApiTags( 'Usuarios' )
@Controller( 'usuarios' )
export class UsuarioController {

  constructor(
    private usuarioService: UsuarioService
  ) { };

  @Roles( RolEnum.ADMIN )
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  };

  @Roles( RolEnum.ADMIN )
  @Get( ':id' )
  findOne(
    @Param( 'id', ParseUUIDPipe ) id: string
  ) {
    return this.usuarioService.findOne( id );
  };

  @Roles( RolEnum.ADMIN )
  @Post()
  createOne(
    @Body() data: CreateUsuarioDto
  ) {
    return this.usuarioService.createOne( data );
  };

  @Roles( RolEnum.ADMIN )
  @Put( ':id' )
  updateOne(
    @Body() changes: UpdateUsuarioDto, @Param( 'id', ParseUUIDPipe ) id: string
  ) {
    return this.usuarioService.updateOne( id, changes );
  };

  @Roles( RolEnum.ADMIN )
  @Delete( ':id' )
  removeOne(
    @Param( 'id', ParseUUIDPipe ) id: string
  ) {
    return this.usuarioService.removeOne( id );
  }
}
