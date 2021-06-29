import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CocheComponent } from './components/coche/coche.component';
import {HomeComponent} from './components/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'formulario',
    component: FormularioComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'reservas',
    component: ReservasComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'admin/usuario',
    component: UsuarioComponent
  },
  {
    path: 'admin/coches',
    component: CocheComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
