import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Asistencia } from '../../asistencias/entities/asistencia.entity';

@Entity( 'profesores' )
export class Profesor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'varchar', length: 128 } )
  nombre: string;

  @Column( { type: 'varchar', length: 255 } )
  apellidos: string;

  @Column( { type: 'varchar', length: 255, unique: true } )
  email: string;

  @Column( { type: 'varchar', name: 'grado_seccion' } )
  gradoSeccion: string;

  @Column( { type: 'int' } )
  dni: number;

  @Column( { type: 'int' } )
  telefono: number;

  @OneToOne( () => Usuario, ( usuario ) => usuario.profesor )
  usuario: Usuario;

  @OneToMany( () => Asistencia, ( asistencia ) => asistencia.profesor )
  asistencia: Asistencia;

}