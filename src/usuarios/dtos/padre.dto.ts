import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePadreDto {

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly apellidoPaterno: string;

  @IsNotEmpty()
  @IsString()
  readonly apellidoMaterno: string;

  @IsNotEmpty()
  @IsString()
  readonly direccion: string;

  @IsNotEmpty()
  @IsString()
  readonly lugarDondeVive: string;

}

export class UpdatePadreDto extends PartialType( CreatePadreDto ) { }