import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profesor } from '../../usuarios/entities/profesor.entity';

@Entity()
export class Asistencia {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'timestamptz', nullable: true } )
  horaSalida: Date;

  @Column( { type: 'timestamptz', nullable: true } )
  horaEntrada: Date;

  @Column( { type: 'timestamptz', default: new Date().toUTCString() } )
  fecha: Date;

  @Column( { type: 'bool', default: false } )
  asistio: boolean;

  @Column( { type: 'varchar', nullable: true } )
  description: string;

  @Column( { type: 'text', nullable: true, name: 'description_salida' } )
  descriptionSalida: string;

  @ManyToOne( () => Profesor, ( profesor ) => profesor.asistencia )
  profesor: Profesor;

}