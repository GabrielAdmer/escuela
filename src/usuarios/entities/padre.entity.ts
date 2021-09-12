import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';


@Entity( 'padres' )
export class Padre {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'varchar', length: 128 } )
  nombre: string;

  @Column( { type: 'varchar', length: 128, name: 'apellido_paterno' } )
  apellidoPaterno: string;

  @Column( { type: 'varchar', length: 128, name: 'apellido_materno' } )
  apellidoMaterno: string;

  @Column( { type: 'varchar', length: 128 } )
  direccion: string;

  @Column( { type: 'varchar', length: 128, name: 'lugar_donde_vive' } )
  lugarDondeVive: string;

}