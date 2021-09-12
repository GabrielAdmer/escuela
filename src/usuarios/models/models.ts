export enum Grado {
  PRIMERO = 'Primer grado',
  SEGUNDO = 'Segundo grado',
  TERCERO = 'Tercer grado',
  CUARTO = 'Cuarto grado',
  QUINTO = 'Quinto grado',
  SEXTO = 'Sexto grado',
}

export enum Seccion {
  A = 'Seccion A',
  B = 'Seccion B',
  O = 'Otro',
}

export interface Grado_Seccion {
  seccion: Seccion;
  grado: Grado;
}