import { Evaluacion } from "./Evaluacion.interface";
import { Proyecto } from "./Proyecto.interface";

export interface Empleado {
    id: number;
    nombre: string;
    apellidos: string;
    nombreUsuario: string;
    evaluaciones: Evaluacion[];
    proyectos: Proyecto[];
  }