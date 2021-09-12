import { Profesor } from '../../usuarios/entities/profesor.entity';

export interface PayloadToken {
  role: string;
  sub: string;
}