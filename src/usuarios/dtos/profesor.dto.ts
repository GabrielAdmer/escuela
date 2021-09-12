import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfesorDto {

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellidos: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly gradoSeccion: string;

  @IsNumber()
  @IsNotEmpty()
  readonly dni: number;

  @IsNumber()
  @IsNotEmpty()
  readonly telefono: number;

}

export class UpdateProfesorDto extends PartialType( CreateProfesorDto ) { }