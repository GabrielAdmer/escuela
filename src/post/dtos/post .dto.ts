import { PartialType } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';


export class CreatePostDto {

  @IsNotEmpty()
  @IsString()
  descriptcion: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  titulo: string;
}

export class UpdatePostDto extends PartialType( CreatePostDto ) { }