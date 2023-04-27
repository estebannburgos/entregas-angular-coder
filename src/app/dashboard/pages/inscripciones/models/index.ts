export interface Inscripcion {
    id: number;
    nombre_alumno: string;
    nombre_curso: string;
  }
  
  export interface CrearInscripcionPayload {
    nombre_alumno: string;
    nombre_curso: string;
  }