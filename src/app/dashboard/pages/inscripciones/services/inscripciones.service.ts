import { Injectable } from '@angular/core';
import { CrearInscripcionPayload, Inscripcion } from '../models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { AbmIncripcionesComponent } from '../abm-incripciones/abm-incripciones.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

const INSCRIPCIONES_MOCKS: Inscripcion[] = [
  {
    id: 1,
    nombre_alumno: 'Pedro Arias',
    nombre_curso: 'Javascript',
  }, 
  {
    id: 2,
    nombre_alumno: 'Juan Pérez',
    nombre_curso: 'Angular',
  }, 
  {
    id: 3,
    nombre_alumno: 'Diego Astorga',
    nombre_curso: 'Angular',
  }, 
  {
    id: 4,
    nombre_alumno: 'María Ramírez',
    nombre_curso: 'Desarrollo Web',
  }, 
  {
    id: 5,
    nombre_alumno: 'María Ramírez',
    nombre_curso: 'Javascript',
  }, 
  {
    id: 6,
    nombre_alumno: 'Pedro Arias',
    nombre_curso: 'Angular',
  }, 
];

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>(
    []
  );
  MatDialog: any;

  dataSource = new MatTableDataSource<Inscripcion>();

  constructor() { }

  obtenerInscripciones(): Observable<Inscripcion[]> {
    this.inscripciones$.next(INSCRIPCIONES_MOCKS);
    return this.inscripciones$.asObservable();
  }

  getInscripcionById(inscripcionId: number): Observable<Inscripcion | undefined> {
    return this.inscripciones$.asObservable()
      .pipe(
        map((inscripciones) => inscripciones.find((c) => c.id === inscripcionId))
      )
  }

  crearInscripcion(payload: CrearInscripcionPayload): Observable<Inscripcion[]> {
    this.inscripciones$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (inscripciones) => {
          this.inscripciones$.next([
            ...inscripciones,
            {
              id: inscripciones.length + 1,
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

    return this.inscripciones$.asObservable();
  }

  editarInscripcion(inscripcionId: number, actualizacion: Partial<Inscripcion>): Observable<Inscripcion[]> {
    this.inscripciones$
      .pipe(
        take(1),
      )
      .subscribe({
        next: (inscripciones) => {

          const inscripcionesActualizados = inscripciones.map((inscripcion) => {
            if (inscripcion.id === inscripcionId) {
              return {
                ...inscripcion,
                ...actualizacion,
              }
            } else {
              return inscripcion;
            }
          })

          this.inscripciones$.next(inscripcionesActualizados);
        },
        complete: () => {},
        error: () => {}
      });

    return this.inscripciones$.asObservable();
  }

  eliminarInscripcion(inscripcionId: number): Observable<Inscripcion[]> {
    this.inscripciones$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (inscripciones) => {
        const inscripcionesActualizados = inscripciones.filter((inscripcion) => inscripcion.id !== inscripcionId)
        this.inscripciones$.next(inscripcionesActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.inscripciones$.asObservable();
  }

}
