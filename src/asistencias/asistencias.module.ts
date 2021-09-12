import { Module } from '@nestjs/common';
import { AsistenciaService } from './services/asistencia.service';
import { AsistenciaController } from './controllers/asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Asistencia ] ), UsuariosModule ],
  providers: [ AsistenciaService ],
  controllers: [ AsistenciaController ]
} )
export class AsistenciasModule { }
