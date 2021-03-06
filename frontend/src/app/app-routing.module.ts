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
import { CarroComponent } from './components/carro/carro.component';
import { PagoComponent } from './components/pago/pago.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { VueloComponent } from './components/vuelo/vuelo.component';
import { ComprasComponent } from './components/compras/compras.component';
import { AdminGuard } from './admin.guard';


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
    path: 'carro',
    component: CarroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pago',
    component: PagoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compras',
    component: ComprasComponent,
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
    component: UsuarioComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/coches',
    component: CocheComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/hoteles',
    component: HotelComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/vuelos',
    component: VueloComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
