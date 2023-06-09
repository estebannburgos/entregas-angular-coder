import { Component, OnDestroy, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource();
  authUser$: Observable<Usuario | null>;
  displayedColumns = [
    'id',
    'nombre',
    'fecha_inicio',
    'fecha_fin',
    'detalle',
    'editar',
    'eliminar',
  ];

  cursosSuscription: Subscription | null = null;

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
  }

  ngOnDestroy(): void {
    this.cursosSuscription?.unsubscribe();
  }

  ngOnInit(): void {
  //  this.cursosService.obtenerCursos().subscribe({
    this.cursosSuscription = this.cursosService.obtenerCursos().subscribe({
    
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  irAlDetalle(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute,
    });
  }

  crearCurso(): void {
    const dialog = this.dialog.open(AbmCursosComponent);
    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.cursosService.crearCurso(formValue)
        //  console.log(formValue);
        }
      });
  }

  editarCurso(curso: Curso): void {
    const dialog = this.dialog.open(AbmCursosComponent, {
      data: {
        curso,
      }
    })

    dialog.afterClosed().subscribe((formValue) => {
        if (formValue) {
          // this.dataSource.data = this.dataSource.data.map(
          //   (cursoActual) => cursoActual.id === curso.id
          //     ? ({ ...cursoActual, ...formValue}) // { nombre: 'xxxxxx', apellido: 'xxxxx' }
          //     : cursoActual,
          // );
           this.cursosService.editarCurso(curso.id, formValue);
        }
      })
  }

  eliminarCurso(curso: Curso): void {
    if (confirm('¿Está seguro de eliminar este curso? Una vez hecho esto no podrá volver atrás.')) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }

  aplicarFiltros(ev: Event): void {}

  // irAlDetalle(cursoId: number): void {}

}
