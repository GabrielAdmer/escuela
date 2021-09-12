import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/model';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { UsuarioService } from '../../usuarios/services/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' ) {
  constructor(
    @Inject( config.KEY ) congifService: ConfigType<typeof config>,
    private usuarioService: UsuarioService
  ) {
    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: congifService.jwtScrete
    } );
  }

  async validate( payload: PayloadToken ) {
    const { sub } = payload;
    const user = await this.usuarioService.findOne( sub );
    return user;
  }

}