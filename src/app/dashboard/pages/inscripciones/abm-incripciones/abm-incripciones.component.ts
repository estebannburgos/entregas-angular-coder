import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Curso, CursoWithSubject } from '../../../cursos/models';
import { AlumnosService } from '../../alumnos/services/alumnos.service';
import { Alumno } from '../../alumnos/alumnos.component';
import { CursosService } from '../../cursos/services/cursos.service';
import { Curso, CursoWithSubject } from '../../cursos/models';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { DialogRef } from '@angular/cdk/dialog';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { CreateInscripcionData } from '../models';

@Component({
  selector: 'app-abm-incripciones',
  templateUrl: './abm-incripciones.component.html',
  styleUrls: ['./abm-incripciones.component.scss']
})
export class AbmIncripcionesComponent implements OnInit, OnDestroy {

  alumnos: Alumno[] = [];
  cursos: CursoWithSubject[] = [];

  // studentIdControl = new FormControl(null, [Validators.required]);
  // subjectIdControl = new FormControl(null, [Validators.required]);
  // courseIdControl = new FormControl(null, [Validators.required]);

  selectedCourseControl = new FormControl<Curso | null>(null);

  studentIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  subjectIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  courseIdControl = new FormControl<number | null>(null, [Validators.required]);

  incripcionForm = new FormGroup({
    subjectId: this.subjectIdControl,
    studentId: this.studentIdControl,
    courseId: this.courseIdControl,
  });

  // constructor(private alumnosService: AlumnosService, private cursosService: CursosService) {
  //   this.incripcionForm.valueChanges.subscribe(console.log);
  // }

  destroyed$ = new Subject<void>();

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private dialogRef: DialogRef<AbmIncripcionesComponent>,
    private store: Store
  ) {
    this.selectedCourseControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.subjectIdControl.setValue(curso.subjectId);
            this.courseIdControl.setValue(curso.id);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.cursosService.obtenerCursosWithSubject().subscribe({
      next: (res) => {
        this.cursos = res;
      },
    });
    this.alumnosService.getStudentsFromDB().subscribe({
      next: (res) => {
        this.alumnos = res;
      },
    });
  }

  onSave(): void {
    this.store.dispatch(
      InscripcionesActions.createInscripcion({
        data: this.incripcionForm.value as CreateInscripcionData,
      })
    );

    this.dialogRef.close();
  }

}