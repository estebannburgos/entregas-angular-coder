import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { AbmIncripcionesComponent } from './abm-incripciones/abm-incripciones.component';
import { InscripcionDetalleComponent } from './pages/inscripcion-detalle/inscripcion-detalle.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionDetalleComponent,
    AbmIncripcionesComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        // /dashboard/cursos
        path: '',
        component: InscripcionesComponent
      },
      {
        path: ':id',
        component: InscripcionDetalleComponent,
      }
    ])
  ]
})
export class InscripcionesModule { }
