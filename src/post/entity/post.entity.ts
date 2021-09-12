import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'varchar' } )
  descriptcion: string;

  @Column( { type: 'varchar' } )
  image: string;

  @Column( { type: 'varchar' } )
  titulo: string;

  @Column( { type: 'timestamptz', default: new Date().toUTCString() } )
  fecha: Date;

}