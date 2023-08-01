import { Empleado } from "./Empleado.interface";
import { Rol } from "./Rol.interface";

export interface Usuario {
    id: number;
    nombre: string;
    contrasena: string;
    email: string;
    empleado: Empleado;
    roles: Rol[];
  }