import { Component, OnDestroy } from '@angular/core';
import { Inscripcion } from '../../models';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripcion-detalle',
  templateUrl: './inscripcion-detalle.component.html',
  styleUrls: ['./inscripcion-detalle.component.scss']
})
export class InscripcionDetalleComponent {
// export class InscripcionDetalleComponent implements OnDestroy {

  // private destroyed$ = new Subject();
  // inscripcion: Inscripcion | undefined;

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private inscripcionesService: InscripcionesService,
  // ) {
  //   this.inscripcionesService.getInscripcionById(parseInt(this.activatedRoute.snapshot.params['id']))
  //   .pipe(takeUntil(this.destroyed$))
  //   .subscribe((inscripcion) => this.inscripcion = inscripcion);
  // }

  // ngOnDestroy(): void {
  //   this.destroyed$.next(true);
  // }


}
