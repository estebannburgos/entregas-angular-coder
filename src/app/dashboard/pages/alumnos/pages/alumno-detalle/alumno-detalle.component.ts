import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../alumnos.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.scss']
})
export class AlumnoDetalleComponent implements OnDestroy {

  alumno: Alumno | undefined;
  authUser$: Observable<Usuario | null>;
  private destroyed$ = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private authService: AuthService,
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.alumnosService.obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((alumno) => this.alumno = alumno);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  eliminarCurso(index: number) {
    if (confirm('¿Está seguro de eliminar el curso asignado al alumno? Una vez hecho esto no podrá volver atrás.')) {
      this.alumno?.cursos.splice(index, 1);
    }
  }
}
