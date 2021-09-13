import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateAsistenciaDto {

  @IsOptional()
  horaSalida: Date;

  @IsOptional()
  horaEntrada: Date;

  @IsOptional()
  fecha: Date;

  @IsOptional()
  asistio: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  descriptionSalida: string;

  @IsNotEmpty()
  profesorId: number;
}

export class UpdateAsistenciaDto extends PartialType( CreateAsistenciaDto ) { }

export class FilterFechaDto {

  @IsOptional()
  inicio: Date;

  @ValidateIf( ( item ) => item.inicio )
  fin: Date;
}