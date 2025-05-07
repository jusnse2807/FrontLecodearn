export type Course = {
  id: string;
  nombre:string;
  imagen:string;
  numModulos:number; 
};

export type Modulo = {
   id: string;
   titulo: string,
   numero: number
};

export type Seccion = {
  id: string;
  titulo: string,
  numero: number,
  teoria: string,
  ejemplo: string
};

