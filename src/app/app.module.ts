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
import { AnuncioService } from './services/anuncio.service';
import { UsuarioService } from './services/usuario.service';
import { UploadService } from './services/upload.service';



// componentes
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { CrearAnuncioComponent } from './components/crear-anuncio/crear-anuncio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AgregarImagenDialogoComponent } from './dialogos/agregar-imagen-dialogo/agregar-imagen-dialogo.component';
import { AgregarUsuarioDialogoComponent } from './dialogos/agregar-usuario-dialogo/agregar-usuario-dialogo.component';
import { EditarAnuncioComponent } from './components/editar-anuncio/editar-anuncio.component';
import { EditarUsuarioDialogoComponent } from './dialogos/editar-usuario-dialogo/editar-usuario-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from './dialogos/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';


//environment
import {  environment } from "../environments/environment";

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';



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
    PerfilComponent,
    AgregarImagenDialogoComponent,
    AgregarUsuarioDialogoComponent,   
    EditarAnuncioComponent,
    EditarUsuarioDialogoComponent,
    ConfirmarBorradoDialogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],

  entryComponents: [
    AgregarImagenDialogoComponent,
    AgregarUsuarioDialogoComponent,
    ConfirmarBorradoDialogoComponent,
    EditarUsuarioDialogoComponent
  ],

  providers: [
    AuthService,
    AnuncioService,
    UsuarioService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
