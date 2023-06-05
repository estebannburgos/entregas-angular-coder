import { Alumno } from "../../alumnos/alumnos.component";
import { Curso } from "../../cursos/models";
import { Subject } from "../../subjects/models";

export interface Inscripcion {
    id: number;
    studentId: number;
    courseId: number;
  }

export interface InscripcionWithStudent extends Inscripcion {
  student: Alumno;
}  

export interface InscripcionWithSubject extends Inscripcion {
  subject: Subject;
}

export interface InscripcionWithCourse extends Inscripcion {
  curso: Curso;
}

export type InscripcionWithAll = InscripcionWithStudent & InscripcionWithSubject & InscripcionWithCourse;
  
  // export interface CrearInscripcionPayload {
  //   nombre_alumno: string;
  //   nombre_curso: string;
  // }