import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionesService } from './services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbmIncripcionesComponent } from './abm-incripciones/abm-incripciones.component';
import { Inscripcion } from './models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns = [
    'id',
    'nombre_alumno',
    'nombre_curso', 
    'detalle', 
    'eliminar', 
    'editar' 
  ];

  constructor(
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.inscripcionesService.obtenerInscripciones().subscribe({
      next: (inscripciones) => {
        this.dataSource.data = inscripciones;
      },
    });
  }

  irAlDetalle(InscripcionId: number): void {
    this.router.navigate([InscripcionId], {
      relativeTo: this.activatedRoute,
    });
  }

  crearInscripcion(): void {
    const dialog = this.dialog.open(AbmIncripcionesComponent);
    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.inscripcionesService.crearInscripcion(formValue)
        }
      });
  }

  editarInscripcion(inscripcion: Inscripcion): void {
    const dialog = this.dialog.open(AbmIncripcionesComponent, {
      data: {
        inscripcion,
      }
    })
  
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
         this.inscripcionesService.editarInscripcion(inscripcion.id, formValue);
      }
    })
  }
  

  eliminarInscripcion(inscripcion: Inscripcion): void {
    if (confirm('¿Está seguro de eliminar este inscripción? Una vez hecho esto no podrá volver atrás.')) {
      this.inscripcionesService.eliminarInscripcion(inscripcion.id);
    }
  }

  aplicarFiltros(ev: Event): void {}

  // irAlDetalle(cursoId: number): void {}

}
