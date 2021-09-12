import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDataURI, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateIf } from 'class-validator';
import { TramiteEstado, TramiteNombre } from '../entities/solicitud.entity';

export class CreateSolicitudDto {

  @IsString()
  @IsNotEmpty()
  readonly tramiteNombre: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly apellidos: string;

  @IsOptional()
  @IsNumber()
  readonly dni: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly descriptcion: string;


  @IsOptional()
  readonly fecha: Date;

  @IsNotEmpty()
  @IsString()
  readonly telefono: string;

  @IsString()
  @IsOptional()
  readonly archivo: string;

  @IsOptional()
  readonly tramiteEstado: string;

  @IsOptional()
  @IsString()
  readonly archivoDescargar: string;

  @IsBoolean()
  @IsOptional()
  readonly visto: boolean;

  @IsString()
  @IsOptional()
  readonly descriptcionRecepcionista;
}

export class UpdateSolicitudDto extends PartialType( CreateSolicitudDto ) { }

export class FilterSolicitud {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min( 0 )
  offset: number;

}