import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AlumnoDetalleComponent } from './dashboard/pages/alumnos/pages/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';
import { CursoDetalleComponent } from './dashboard/pages/cursos/pages/curso-detalle/curso-detalle.component';
import { InscripcionesComponent } from './dashboard/pages/inscripciones/inscripciones.component';
import { InscripcionDetalleComponent } from './dashboard/pages/inscripciones/pages/inscripcion-detalle/inscripcion-detalle.component';

const routes: Routes = [
  // DASHBOARD
  {
    // http://localhost:XXXX/dashboard
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },

  // AUTH
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // RUTAS INDEFINIDAS....
  {
    // CUALQUIER RUTA
    path: '**',
    redirectTo: 'dashboard',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
