import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { CrearAnuncioComponent } from './components/crear-anuncio/crear-anuncio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditarAnuncioComponent } from './components/editar-anuncio/editar-anuncio.component';

const routes: Routes = [

  { path: '', redirectTo: 'tablero', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },



  {
    path: '', component: LayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: 'tablero', component: TableroComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'anuncios', component: AnunciosComponent },
      { path: 'crear-anuncio', component: CrearAnuncioComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'editar-anuncio', component: EditarAnuncioComponent },
    ]
  },
  //not found
  { path: '**', redirectTo: 'tablero' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
