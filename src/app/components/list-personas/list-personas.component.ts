import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/interfaces/persona';
import { AddEditPersonaComponent } from '../add-edit-persona/add-edit-persona.component';
import { PersonaService } from 'src/app/services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

// const listaPersona: Persona[] = [
//   { idPersona: 1, nombre: 'Omar', apellidoPaterno: 'Maylle', apellidoMaterno: 'Iguavel', correo: 'omarmi15200@gmail.com', tipoDocumento: 'DNI', idTipoDocumento: 1, numeroDocumento: '75586628', fechaNacimiento: new Date() },
//   { idPersona: 2, nombre: 'Daniel', apellidoPaterno: 'Maylle', apellidoMaterno: 'Iguavel', correo: 'omarmi15200@gmail.com', tipoDocumento: 'DNI', idTipoDocumento: 1, numeroDocumento: '75586629', fechaNacimiento: new Date() },
//   { idPersona: 3, nombre: 'Juan', apellidoPaterno: 'Maylle', apellidoMaterno: 'Iguavel', correo: 'omarmi15200@gmail.com', tipoDocumento: 'DNI', idTipoDocumento: 1, numeroDocumento: '75586630', fechaNacimiento: new Date() },
//   { idPersona: 4, nombre: 'Jose', apellidoPaterno: 'Maylle', apellidoMaterno: 'Iguavel', correo: 'omarmi15200@gmail.com', tipoDocumento: 'DNI', idTipoDocumento: 1, numeroDocumento: '75586631', fechaNacimiento: new Date() },
//   { idPersona: 5, nombre: 'Maria', apellidoPaterno: 'Maylle', apellidoMaterno: 'Iguavel', correo: 'omarmi15200@gmail.com', tipoDocumento: 'DNI', idTipoDocumento: 1, numeroDocumento: '75586632', fechaNacimiento: new Date() },
//   { idPersona: 6, nombre: 'Andres', apellidoPaterno: 'Maylle', apellidoMaterno: 'Iguavel', correo: 'omarmi15200@gmail.com', tipoDocumento: 'DNI', idTipoDocumento: 1, numeroDocumento: '75586633', fechaNacimiento: new Date() }
// ];

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['TipoDocumento', 'NumeroDocumento', 'Persona', 'Correo', 'FechaNacimiento', 'Acción'];
  dataSource: MatTableDataSource<Persona>;
  resultsLength = 0;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _personaService: PersonaService, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getPersonas();
    this.isLoading = false
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPersonas() {
    this._personaService.getPersonas().subscribe(
      data => {
        this.dataSource.data = data;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  getPersonaById(idPersona: number) {
    this._personaService.getPersonaById(idPersona).subscribe(
      data => {
        console.log(data)
      }
    );
  }

  deletePersonaById(idPersona: number) {
    this._personaService.deletePersonaById(idPersona).subscribe(
      data => {
        console.log(data)
        this.getPersonas();
        this.message("La Persona fue eliminada con éxito")
      }
    );
  }

  agregarPersona() {
    const dialogRef = this.dialog.open(AddEditPersonaComponent, {
      width: '600px',
      disableClose: true,
      data:{idPersona:undefined}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.getPersonas();
    });
  }

  editPersona(idPersona: number) {
    const dialogRef = this.dialog.open(AddEditPersonaComponent, {
      width: '600px',
      disableClose: true,
      data:{idPersona:idPersona}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPersonas();
    });
  }

  async deletePersona(idPersona: number) {

    let result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar persona?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: `Cancelar`
    });

    if (!result.isConfirmed) {
      return;
    } 

    this.isLoading = true;
    this.deletePersonaById(idPersona);
    this.isLoading = false;

  }

  message(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000
    });
  }

}
