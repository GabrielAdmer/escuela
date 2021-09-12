export enum TramiteNombre {
  matricula = "matricula",
  notas = "notas",
  permiso = "permiso",
  vacante = "vacante",
  otro = "otro"
}

export enum TramiteEstado {
  pendiente = "pendiente",
  proceso = "proceso",
  rechazado = "rechazado",
  aprobado = "aprobado"
}



import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Solicitud {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'varchar', length: 64 } )
  nombre: string;

  @Column( { type: 'varchar', length: 128 } )
  apellidos: string;

  @Column()
  dni: number;

  @Column( { type: 'varchar', length: 255 } )
  email: string;

  @Column( { type: 'text' } )
  descriptcion: string;

  @Column( { type: 'varchar', default: 'notas', name: 'tramite_nombre' } )
  tramiteNombre: string;

  @Column( { type: 'varchar' } )
  telefono: string;

  @Column( { type: 'varchar', nullable: true } )
  archivo: string;

  @Column( { type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' } )
  fecha: Date;

  //? archivo no visible para el padre en en la solitud
  @Column( { type: 'varchar', default: 'pendiente', name: 'tramite_estado' } )
  tramiteEstado: string;

  @Column( { type: 'varchar', nullable: true } )
  archivoDescargar: string;

  @Column( { type: 'bool', default: false } )
  visto: boolean;

  @Column( { type: 'text', name: 'descripcion_recepcionista', nullable: true } )
  descriptcionRecepcionista: string;

  @CreateDateColumn( {
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  } )
  createAt: Date;


  @UpdateDateColumn( {
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  } )
  updateAt: Date;
}


