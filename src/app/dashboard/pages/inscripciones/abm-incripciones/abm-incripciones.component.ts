import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-incripciones',
  templateUrl: './abm-incripciones.component.html',
  styleUrls: ['./abm-incripciones.component.scss']
})
export class AbmIncripcionesComponent {

  nombreAlumnoControl = new FormControl('', [Validators.required]);
  nombreCursoControl = new FormControl('', [Validators.required]);

  inscripcionForm = new FormGroup({
    nombre_alumno: this.nombreAlumnoControl,
    nombre_curso: this.nombreCursoControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmIncripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if (data) {
      const inscripcionParaEditar = data.inscripcion;
      this.nombreAlumnoControl.setValue(inscripcionParaEditar.nombre_alumno);
      this.nombreCursoControl.setValue(inscripcionParaEditar.nombre_curso);
    }
  }


  guardar(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close(this.inscripcionForm.value)
    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }

}
