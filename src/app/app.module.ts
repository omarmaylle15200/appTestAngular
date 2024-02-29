import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { AddEditPersonaComponent } from './components/add-edit-persona/add-edit-persona.component';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    ListPersonasComponent,
    AddEditPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide:MAT_DATE_LOCALE,useValue:"es"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
