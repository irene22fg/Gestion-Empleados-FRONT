import { Empleado } from "./Empleado";
import { Rol } from "./Rol.interface";

export interface Usuario {
    id: number;
    nombre: string;
    contrasena: string;
    email: string;
    empleado: Empleado;
    roles: Rol[];
  }