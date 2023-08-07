import { Evaluacion } from "./Evaluacion";
import { Proyecto } from "./Proyecto";

export class Empleado {
    id!: number;
    nombre!: string;
    apellidos!: string;
    nombreUsuario!: string;
    evaluaciones!: Evaluacion[];
    evaluacionesIds!: number[];
    proyectos!: Proyecto[];
    proyectosIds!: number[];
  }