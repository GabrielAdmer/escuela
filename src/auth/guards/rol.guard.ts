import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolEnum } from '../models/rol.model';

// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Rol } from '../models/role.enum';
// import { User } from '../../usuarios/entities/user.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { ROLES_KEY } from '../decorators/rol.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<RolEnum[]>( ROLES_KEY, context.getHandler() );
    if ( !roles ) {
      return true;
    }
    // ['admin', 'customer'];
    const request = context.switchToHttp().getRequest();
    const user = request.user as Usuario;
    // { role: 'admin', sub: 1212 }
    const isAuth = roles.some( ( role ) => role === user.rol );
    //const isAuth = roles.includes(user.role);
    if ( !isAuth ) {
      throw new UnauthorizedException( 'your role is wrong' );
    }
    return isAuth;
  }
}