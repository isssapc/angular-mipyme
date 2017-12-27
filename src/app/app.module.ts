import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MenuComponent } from './components/menu/menu.component';


// servicios
import { AuthService } from './services/auth.service';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { CrearAnuncioComponent } from './components/crear-anuncio/crear-anuncio.component';
import { PerfilComponent } from './components/perfil/perfil.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    UsuariosComponent,
    TableroComponent,
    LoginComponent,
    MenuComponent,
    AnuncioComponent,
    AnunciosComponent,
    CrearAnuncioComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
