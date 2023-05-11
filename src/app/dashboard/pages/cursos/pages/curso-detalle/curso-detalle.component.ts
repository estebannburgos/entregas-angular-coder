import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models';
import { Usuario } from 'src/app/core/models';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss']
})
export class CursoDetalleComponent implements OnDestroy {

  curso: Curso | undefined;
  private destroyed$ = new Subject();
  authUser$: Observable<Usuario | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private authService: AuthService,
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
    this.cursosService.getCursoById(parseInt(this.activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
    .subscribe((curso) => this.curso = curso);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  eliminarAlumno(index: number) {
    if (confirm('¿Está seguro de eliminar el alumno asignado al curso? Una vez hecho esto no podrá volver atrás.')) {
      this.curso?.alumnos.splice(index, 1);
    }
  }

}
