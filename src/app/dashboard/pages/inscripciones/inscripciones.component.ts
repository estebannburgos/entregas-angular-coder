import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from './services/inscripciones.service';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { State } from './store/inscripciones.reducer';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  state$: Observable<State>;

  constructor(
    private inscripcionesService: InscripcionesService,
    private store: Store,
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
  }

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }))
  }
}