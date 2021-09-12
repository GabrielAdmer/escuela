import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PayloadToken } from '../models/model';
import { IsPublic } from '../decorators/ispublic.decorator';
import { getMenuFrontend } from '../../helpers/menu-frontend';

@Controller( 'auth' )
export class LoginController {

  constructor(
    private authService: AuthService
  ) { }

  @UseGuards( AuthGuard( 'local-login' ) )
  @Post( 'login' )
  login(
    @Req() req: Request
  ) {
    const user = req.user as Usuario;
    console.log( user );
    return {
      data: this.authService.generateJWT( user ),
      menu: getMenuFrontend( user.rol )
    };
  }

  @UseGuards( JwtAuthGuard )
  @Get( 'refresh' )
  async refreshToken(
    @Req() req: Request
  ) {
    const user = req.user as Usuario;
    const data = await this.authService.generateJWT( user );
    return {
      message: "refresh exitoso",
      data,
      menu: getMenuFrontend( user.rol )
    };
  }


}
