import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private appUrl?: string;
  private apiCentralizadorUrl?: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.endpoint;
    this.apiCentralizadorUrl = `persona/`
  }

  getPersonas(): Observable<Persona[]> {
    try {
      const data = this.http.get<Persona[]>(`${this.appUrl}${this.apiCentralizadorUrl}getPersonas`);
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; 
    }
  }

  getPersonaById(idPersona:number): Observable<Persona> {
    try {
      const data = this.http.get<Persona>(`${this.appUrl}${this.apiCentralizadorUrl}getPersonaById/${idPersona}`);
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; 
    }
  }

  deletePersonaById(idPersona:number): Observable<void> {
    try {
      const data = this.http.delete<void>(`${this.appUrl}${this.apiCentralizadorUrl}deletePersona/${idPersona}`);
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; 
    }
  }

  addPersona(persona:Persona): Observable<void> {
    try {
      const data = this.http.post<void>(`${this.appUrl}${this.apiCentralizadorUrl}createPersona`,persona);
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; 
    }
  }

  updatePersona(persona:Persona): Observable<void> {
    try {
      const data = this.http.put<void>(`${this.appUrl}${this.apiCentralizadorUrl}updatePersona`,persona);
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; 
    }
  }
}
