import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CursosModule } from './pages/cursos/cursos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AlumnoDetalleComponent } from './pages/alumnos/pages/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { CursoDetalleComponent } from './pages/cursos/pages/curso-detalle/curso-detalle.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { InscripcionDetalleComponent } from './pages/inscripciones/pages/inscripcion-detalle/inscripcion-detalle.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule,
    RouterModule.forChild([
      {
        // http://localhost:XXXX/dashboard/estudiantes
        path: 'estudiantes',
        children: [
          {
            // dashboard/estudiantes
            path: '',
            component: AlumnosComponent,
          },
          {
            // dashboard/estudiantes/:id
            path: ':id',
            component: AlumnoDetalleComponent
          }
        ]
      },
      {
        path: 'cursos',
        children: [
          {
            // dashboard/cursos
            path: '',
            component: CursosComponent,
          },
          {
            // dashboard/cursos/:id
            path: ':id',
            component: CursoDetalleComponent
          }
        ]
      },
      {
        path: 'inscripciones',
        children: [
          {
            // dashboard/inscripciones
            path: '',
            component: InscripcionesComponent,
          },
          {
            // dashboard/inscripcion/:id
            path: ':id',
            component: InscripcionDetalleComponent
          }
        ]
      }
    ])
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
