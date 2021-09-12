import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Padre } from '../entities/padre.entity';
import { CreatePadreDto, UpdatePadreDto } from '../dtos/padre.dto';

@Injectable()
export class PadreService {

  constructor(
    @InjectRepository( Padre ) private padreRepo: Repository<Padre>
  ) { }

  findAll() {
    return this.padreRepo.find();
  };

  async findOne( id: number ) {
    const padre = await this.padreRepo.findOne( id );

    if ( !padre ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }

    return padre;
  };

  createOne( data: CreatePadreDto ) {
    const newPadre = this.padreRepo.create( data );
    return this.padreRepo.save( newPadre );
  };

  async updateOne( id: number, change: UpdatePadreDto ) {
    const padre = await this.padreRepo.findOne( id );

    this.padreRepo.merge( padre, change );

    return this.padreRepo.save( padre );
  };

  removeOne( id: number ) {
    return this.padreRepo.delete( id );
  }

}
