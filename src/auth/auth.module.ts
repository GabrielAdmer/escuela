import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { LoginController } from './controllers/login.controller';
import { LocalLoginEstrategy } from './estrategies/local-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './estrategies/jwt.strategy';

@Module( {
  providers: [ AuthService, LocalLoginEstrategy, JwtStrategy ],
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync( {
      inject: [ config.KEY ],
      useFactory: ( configService: ConfigType<typeof config> ) => {
        return {
          secret: configService.jwtScrete,
          signOptions: {
            expiresIn: '10d'
          }
        };
      }
    } )
  ],
  controllers: [ LoginController ]
} )
export class AuthModule { }
