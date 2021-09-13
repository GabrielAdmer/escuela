import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profesor } from './profesor.entity';

import * as bcryp from 'bcrypt';


@Entity( 'usuarios' )
export class Usuario {

  @PrimaryGeneratedColumn( 'uuid' )
  id: string;

  @Column( { type: 'varchar', length: 255, nullable: true } )
  nombre: string;

  @Column( { type: 'varchar', unique: true } )
  email: string;

  @Column( { type: 'varchar', length: 128 } )
  password: string;

  @Column( { type: 'varchar', default: 'profesor' } )
  rol: string;

  @OneToOne( () => Profesor, ( profesor ) => profesor.usuario, { nullable: true } )
  @JoinColumn()
  profesor: Profesor;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if ( !this.password ) {
      return;
    }
    this.password = await bcryp.hash( this.password, 2 );
  }

}

