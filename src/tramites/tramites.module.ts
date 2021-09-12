import { Module } from '@nestjs/common';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudController } from './controllers/solicitud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Solicitud ] ), UsuariosModule ],
  providers: [ SolicitudService ],
  controllers: [ SolicitudController ]
} )
export class TramitesModule { }
