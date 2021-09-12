import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PayloadToken } from '../models/model';


@Injectable()
export class AuthService {

  constructor(
    private usuarioService: UsuarioService,
    private jwtSerivice: JwtService
  ) { };

  async validarUsuario( email: string, password: string ) {

    const usuario = await this.usuarioService.findByEmail( email );

    if ( usuario ) {
      console.log( usuario.password );
      const isMatch = await bcrypt.compare( password, usuario.password );
      console.log( isMatch );
      if ( isMatch ) {
        return usuario;
      }
    }
    return null;
  };

  generateJWT( user: Usuario ) {
    console.log( user );
    const payload: PayloadToken = { role: user.rol, sub: user.id };
    return {
      acc_token: this.jwtSerivice.sign( payload ),
      user
    };
  }

}
