import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindConditions, Repository } from 'typeorm';
import { Asistencia } from '../entities/asistencia.entity';
import { CreateAsistenciaDto, UpdateAsistenciaDto } from '../dtos/asistencia.dto';
import { Profesor } from '../../usuarios/entities/profesor.entity';

@Injectable()
export class AsistenciaService {

  constructor(
    @InjectRepository( Asistencia ) private asistenciaRepo: Repository<Asistencia>,
    @InjectRepository( Profesor ) private profesorRepo: Repository<Profesor>
  ) { };


  findAll() {
    return this.asistenciaRepo.find( { relations: [ 'profesor' ] } );
  }

  async finOne( id: number ) {
    const asistencia = await this.asistenciaRepo.findOne( id );
    if ( !asistencia ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }

    return asistencia;
  }

  async createOne( data: CreateAsistenciaDto ) {
    const newAsistencia = this.asistenciaRepo.create( data );
    if ( data.profesorId ) {
      const profesor = await this.profesorRepo.findOne( data.profesorId );
      newAsistencia.profesor = profesor;
    }
    return this.asistenciaRepo.save( newAsistencia );
  }

  async updateOne( id: number, changes: UpdateAsistenciaDto ) {
    const asistencia = await this.asistenciaRepo.findOne( id );

    if ( !asistencia ) {
      throw new NotFoundException( `Is ${id} no encontrado` );
    }

    this.asistenciaRepo.merge( asistencia, changes );
    return this.asistenciaRepo.save( asistencia );
  }

  async porFecha( incio: Date, fin: Date ) {
    // const fechas = await this.asistenciaRepo.query( "SELECT * FROM ASISTENCIAS" );
    // return fechas;
    const where: FindConditions<Asistencia> = {};
    where.fecha = Between( incio, fin );
    const fechas = await this.asistenciaRepo.find( { where } );
    return fechas;
  }
}
