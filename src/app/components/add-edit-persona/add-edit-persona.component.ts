import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/interfaces/persona';
import { TipoDocumento } from 'src/app/interfaces/tipoDocumento';
import { PersonaService } from 'src/app/services/persona.service';
import * as moment from 'moment';


@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css']
})
export class AddEditPersonaComponent implements OnInit {

  tiposDocumento: TipoDocumento[] = [
    { idTipoDocumento: 1, tipoDocumento: 'DNI' },
    { idTipoDocumento: 2, tipoDocumento: 'RUC' }
  ];
  formGroup: FormGroup;
  maxDate: Date;
  idLoading: boolean = false;
  operacion: string = "Agregar";
  idPersona: number | undefined;

  constructor(public dialogRef: MatDialogRef<AddEditPersonaComponent>, private formBuilder: FormBuilder, private _personaService: PersonaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: [''],
      idTipoDocumento: [null, Validators.required],
      numeroDocumento: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaNacimiento: [null]
    });
    this.idPersona = data.idPersona
  }
  ngOnInit(): void {
    if (this.idPersona != undefined) {
      this.operacion = "Editar";
      this.getPersonaById(this.idPersona)
    }
  }


  cancelar() {
    this.dialogRef.close();
  }

  getPersonaById(idPersona: number) {
    this._personaService.getPersonaById(idPersona).subscribe(
      data => {
        console.log(data)
        this.formGroup.patchValue({
          nombre: data.nombre,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          correo: data.correo,
          idTipoDocumento: data.idTipoDocumento,
          numeroDocumento: data.numeroDocumento,
          fechaNacimiento: data.fechaNacimiento
        })
      }
    );
  }

  savePersona() {

    if (this.formGroup.invalid) {
      return;
    }

    let nombre = this.formGroup.get("nombre")?.value;
    let apellidoPaterno = this.formGroup.get("apellidoPaterno")?.value;
    let apellidoMaterno = this.formGroup.get("apellidoMaterno")?.value;
    let idTipoDocumento = this.formGroup.get("idTipoDocumento")?.value;
    let numeroDocumento = this.formGroup.get("numeroDocumento")?.value;
    let correo = this.formGroup.get("correo")?.value;
    let fechaNacimiento = this.formGroup.get("fechaNacimiento")?.value;

    const persona: Persona = {
      idPersona:0,
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      idTipoDocumento: idTipoDocumento,
      numeroDocumento: numeroDocumento,
      correo: correo,
      fechaNacimiento: fechaNacimiento
    }

    this.idLoading = true

    if(this.idPersona!=undefined){
      persona.idPersona=this.idPersona;
      this._personaService.updatePersona(persona).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close();
          this.message("La Persona actualizada con éxito")
        }
      )
      this.idLoading = false;
      return;
    }

    this._personaService.addPersona(persona).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close();
        this.message("La Persona registrada con éxito")
      }
    )
    this.idLoading = false;

  }

  message(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000
    });
  }
}
