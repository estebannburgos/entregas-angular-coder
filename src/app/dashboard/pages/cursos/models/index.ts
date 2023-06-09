import { Subject } from "../../subjects/models";

export interface Curso {
  id: number;
  nombre: string;
  subjectId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  alumnos: {
    alumno_id: number,
    alumno_nombre: string
  }[];
}

export interface CursoWithSubject extends Curso {
  subject: Subject;
}

export interface CrearCursoPayload {
  nombre: string;
  subjectId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  alumnos: {
    alumno_id: number,
    alumno_nombre: string
  }[];
}