export interface Persona{
    idPersona?:number;
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    correo:string;
    tipoDocumento?:string;
    idTipoDocumento:number;
    numeroDocumento:string;
    fechaNacimiento:Date
}