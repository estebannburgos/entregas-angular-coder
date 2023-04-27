export interface Curso {
  id: number;
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  alumnos: {
    alumno_id: number,
    alumno_nombre: string
  }[];
}

export interface CrearCursoPayload {
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  alumnos: {
    alumno_id: number,
    alumno_nombre: string
  }[];
}