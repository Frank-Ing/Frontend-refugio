export type Sex = 'Hembra' | 'Macho';
export type AnimalType = 'Perro' | 'Gato';

export interface Animal {
  identificador: number;
  nombre: string;
  raza: string;
  edad: number;
  sexo: Sex;
  fechaingreso: string;
  tipoanimal: AnimalType;
}

export interface AnimalInput {
  nombre: string;
  raza: string;
  edad: number;
  sexo: Sex;
  tipoAnimal: AnimalType;
}
