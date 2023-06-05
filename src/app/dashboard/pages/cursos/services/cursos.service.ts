import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take, tap } from 'rxjs';
import { CrearCursoPayload, Curso } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';


const CURSOS_MOCKS: Curso[] = [
  {
    id: 1,
    subjectId: 3,
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
    alumnos: [{
      alumno_id: 1,
      alumno_nombre :'Pedro Arias'
    },
    {
      alumno_id: 2,
      alumno_nombre :'Juan Pérez'
    },
    {
      alumno_id: 3,
      alumno_nombre :'Diego Astorga'
    }]
  },
  {
    id: 2,
    subjectId: 3,
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
    alumnos: [{
      alumno_id: 1,
      alumno_nombre :'Pedro Arias'
    },
    {
      alumno_id: 4,
      alumno_nombre :'María Ramírez'
    }]
  },
  {
    id: 3,
    subjectId: 3,
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
    alumnos: [{
      alumno_id: 4,
      alumno_nombre :'María Ramírez'
    }]
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>(
    []
  );

  constructor(
    private httpClient: HttpClient
  ) {}

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  obtenerCursos(): Observable<Curso[]> {
    // this.cursos$.next(CURSOS_MOCKS);
    // return this.cursos$.asObservable();
    return this.httpClient.get<Curso[]>(`${enviroment.apiBaseUrl}/cursos`)
      .pipe(
        tap((cursos) => this.cursos$.next(cursos)),
        mergeMap(() => this.cursos$.asObservable())
      );
  }

  getCursoById(cursoId: number): Observable<Curso | undefined> {
    return this.cursos$.asObservable()
      .pipe(
        map((cursos) => cursos.find((c) => c.id === cursoId))
      )
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          this.cursos$.next([
            ...cursos,
            {
              id: cursos.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      });

      // then => next
      // catch => error
      // finally => complete

    return this.cursos$.asObservable();
  }

  editarCurso(cursoId: number, actualizacion: Partial<Curso>): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1),
      )
      .subscribe({
        next: (cursos) => {

          const cursosActualizados = cursos.map((curso) => {
            if (curso.id === cursoId) {
              return {
                ...curso,
                ...actualizacion,
              }
            } else {
              return curso;
            }
          })

          this.cursos$.next(cursosActualizados);
        },
        complete: () => {},
        error: () => {}
      });

    return this.cursos$.asObservable();
  }


  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.filter((curso) => curso.id !== cursoId)
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.cursos$.asObservable();
  }
}
