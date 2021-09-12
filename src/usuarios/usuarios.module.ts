import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PadreService } from './services/padre.service';
import { PadreController } from './controllers/padre.controller';
import { Padre } from './entities/padre.entity';
import { ProfesorService } from './services/profesor.service';
import { ProfesorController } from './controllers/profesor.controller';
import { Profesor } from './entities/profesor.entity';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Usuario, Padre, Profesor ] ) ],
  providers: [ UsuarioService, PadreService, ProfesorService ],
  controllers: [ UsuarioController, PadreController, ProfesorController ],
  exports: [ TypeOrmModule, UsuarioService ]
} )
export class UsuariosModule { }
