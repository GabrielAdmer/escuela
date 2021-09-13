import { PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  readonly rol: string;

  @IsNumber()
  readonly profesorId: number;

}

export class UpdateUsuarioDto extends PartialType( CreateUsuarioDto ) { };