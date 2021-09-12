import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Solicitud } from '../entities/solicitud.entity';
import { CreateSolicitudDto, UpdateSolicitudDto, FilterSolicitud } from '../dtos/solicitud.dto';

import { Padre } from 'src/usuarios/entities/padre.entity';

@Injectable()
export class SolicitudService {

  constructor(
    @InjectRepository( Solicitud ) private solicitudRepo: Repository<Solicitud>,
    @InjectRepository( Padre ) private padreRepo: Repository<Padre>
  ) { }

  async findAll( params?: FilterSolicitud ) {

    const total = await this.solicitudRepo.count();

    if ( Object.keys( params ).length > 0 ) {
      const { limit, offset } = params;
      return {
        total: total,
        solicitudes: await this.solicitudRepo.find( {
          relations: [],
          take: limit, skip: offset
        } )
      };
    }
    return {
      total,
      solicitudes: await this.solicitudRepo.find()
    };
  };

  async findOne( id: number ) {
    const solicitud = await this.solicitudRepo.findOne( id );

    if ( !solicitud ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }

    return solicitud;
  };

  async createOne( data: CreateSolicitudDto ) {
    const newSolicitud = this.solicitudRepo.create( data );
    return this.solicitudRepo.save( newSolicitud );
  };

  async updateOne( id: number, changes: UpdateSolicitudDto ) {
    const solicitud = await this.solicitudRepo.findOne( id );

    this.solicitudRepo.merge( solicitud, changes );

    return this.solicitudRepo.save( solicitud );
  };

  removeOne( id: number ) {
    return this.solicitudRepo.delete( id );
  }

}
