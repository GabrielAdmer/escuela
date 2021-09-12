import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UsuariosModule } from './usuarios/usuarios.module';

import { enviroments } from './envitoments';
import { TramitesModule } from './tramites/tramites.module';
import { AuthModule } from './auth/auth.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { PostModule } from './post/post.module';
import config from './config';

@Module( {
  imports: [
    DatabaseModule,
    UsuariosModule,
    ConfigModule.forRoot( {
      envFilePath: enviroments[ process.env.NODE_ENV ] || '.env',
      load: [ config ],
      isGlobal: true
    } ),
    TramitesModule,
    AuthModule,
    AsistenciasModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
