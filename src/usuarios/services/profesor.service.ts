import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from '../entities/profesor.entity';
import { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor.dto';
import { UpdatePadreDto } from '../dtos/padre.dto';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository( Profesor ) private profeRepo: Repository<Profesor>
  ) { }

  findAll() {
    return this.profeRepo.find();
  };

  async findOne( id: number ) {
    const profesor = await this.profeRepo.findOne( id );

    if ( !profesor ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }

    return profesor;
  };

  createOne( data: CreateProfesorDto ) {
    const newProfesor = this.profeRepo.create( data );
    return this.profeRepo.save( newProfesor );
  };

  async updateOne( id: number, change: UpdateProfesorDto ) {
    const profesor = await this.profeRepo.findOne( id );

    this.profeRepo.merge( profesor, change );

    return this.profeRepo.save( profesor );
  };

  removeOne( id: number ) {
    return this.profeRepo.delete( id );
  }

}
