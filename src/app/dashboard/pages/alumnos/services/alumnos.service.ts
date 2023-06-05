import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Alumno } from '../alumnos.component';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // Subject
  private estudiantes2$ = new Subject<Alumno[]>();

  // BehaviorSubject
  private estudiantes$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Pedro',
      apellido: 'Arias',
      fecha_registro: new Date(),
      cursos: [{
        curso_id: 1,
        curso_nombre :'Angular'
      },
      {
        curso_id: 2,
        curso_nombre :'Javascript'
      }]
    },
    {
      id: 2,
      nombre: 'Juan',
      apellido: 'Pérez',
      fecha_registro: new Date(),
      cursos: [{
        curso_id: 1,
        curso_nombre :'Angular'
      }]
    },
    {
      id: 3,
      nombre: 'Diego',
      apellido: 'Astorga',
      fecha_registro: new Date(),
      cursos: [{
        curso_id: 1,
        curso_nombre :'Angular'
      }]
    },
    {
      id: 4,
      nombre: 'María',
      apellido: 'Ramírez',
      fecha_registro: new Date(),
      cursos: [{
        curso_id: 2,
        curso_nombre :'Javascript'
      },
      {
        curso_id: 3,
        curso_nombre :'Desarrollo web'
      }]
    },
    {
      id: 5,
      nombre: 'Ángela',
      apellido: 'Rivera',
      fecha_registro: new Date(),
      cursos: [{
        curso_id: 1,
        curso_nombre :'Javascript'
      }]
    },
  ])

  // constructor() { }

  constructor(private httpClient: HttpClient) { }

  getStudentsFromDB(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${enviroment.apiBaseUrl}/students`);
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.estudiantes$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find((a) => a.id === id))
      )
  }
}
