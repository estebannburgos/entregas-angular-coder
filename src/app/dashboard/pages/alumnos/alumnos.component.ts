import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';
import { Usuario } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fecha_registro: Date;
  cursos: {
    curso_id: number,
    curso_nombre: string
  }[];
}

@Component({
  selector: 'app-tablas',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {


  dataSource = new MatTableDataSource<Alumno>();

  
  authUser$: Observable<Usuario | null>;

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fecha_registro', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private authService: AuthService,
  ) {
    this.alumnosService.obtenerAlumnos()
      .subscribe((alumnos) => {
        this.dataSource.data = alumnos;
      })

    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
    
  }

  irAlDetalle(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute,
    });
  }

  crearAlumno(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          // AGREGANDO NUEVO ELEMENTO:
          {
            ...valor, // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }


  eliminarAlumno(alumnoParaEliminar: Alumno): void {
    if (confirm('¿Está seguro de eliminar al alumno? Una vez hecho esto no podrá volver atrás.')) {
      this.dataSource.data = this.dataSource.data.filter(
        (alumnoActual) => alumnoActual.id !== alumnoParaEliminar.id,
      );
    }
  }

  editarAlumno(alumnoParaEditar: Alumno): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar
      }
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map(
          (alumnoActual) => alumnoActual.id === alumnoParaEditar.id
            ? ({ ...alumnoActual, ...valorDelFormulario}) // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            : alumnoActual,
        );
      }
    })
  }
}
