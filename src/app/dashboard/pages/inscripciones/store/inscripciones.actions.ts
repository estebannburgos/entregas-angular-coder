import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscripcionWithAll } from '../models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: InscripcionWithAll[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
    'Delete Inscripcion': props<{ id: number }>(),
    'Delete Inscripcion Success': props<{ data: number }>(),
    'Delete Inscripcion Failure': props<{ error: unknown }>(),
  }
});