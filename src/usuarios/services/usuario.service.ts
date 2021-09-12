import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';
import { Profesor } from '../entities/profesor.entity';



@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository( Usuario ) private usuarioRepo: Repository<Usuario>,
    @InjectRepository( Profesor ) private profeRepo: Repository<Profesor>
  ) { }

  findAll() {
    return this.usuarioRepo.find( { relations: [ 'profesor' ] } );
  };

  async findOne( id: string ) {
    const usuario = await this.usuarioRepo.findOne( id, { relations: [ 'profesor' ] } );

    if ( !usuario ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }

    return usuario;
  };

  async createOne( data: CreateUsuarioDto ) {
    const newUser = this.usuarioRepo.create( data );

    if ( data.profesorId ) {
      const profe = await this.profeRepo.findOne( data.profesorId );
      newUser.profesor = profe;
    }

    return this.usuarioRepo.save( newUser );
  };

  async updateOne( id: string, change: UpdateUsuarioDto ) {
    const usuario = await this.usuarioRepo.findOne( id );

    if ( change.profesorId ) {
      const profe = await this.profeRepo.findOne( change.profesorId );
      console.log( profe );
      usuario.profesor = profe;
    }

    this.usuarioRepo.merge( usuario, change );

    return this.usuarioRepo.save( usuario );
  };

  removeOne( id: string ) {
    return this.usuarioRepo.delete( id );
  }

  //**** Login por email **/
  async findByEmail( email: string ) {
    const result = await this.usuarioRepo.findOne( { where: { email }, relations: [ 'profesor' ] }, );
    return this.usuarioRepo.findOne( { where: { email }, relations: [ 'profesor' ] }, );
  }

}
