import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CursoDetalleComponent } from './pages/curso-detalle/curso-detalle.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalleComponent,
    AbmCursosComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    RouterModule.forChild([
      {
        // /dashboard/cursos
        path: '',
        component: CursosComponent
      },
      {
        path: ':id',
        component: CursoDetalleComponent,
      }
    ])
  ]
})
export class CursosModule { }
