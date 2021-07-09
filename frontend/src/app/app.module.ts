import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';    

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';

import { ReservasComponent } from './components/reservas/reservas.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CocheComponent } from './components/coche/coche.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarroComponent } from './components/carro/carro.component';
import { PagoComponent } from './components/pago/pago.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { VueloComponent } from './components/vuelo/vuelo.component';
import { MatListModule } from '@angular/material/list';
import { ComprasComponent } from './components/compras/compras.component'; 

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    FormularioComponent,
    ReservasComponent,
    UsuarioComponent,
    CocheComponent,
    CarroComponent,
    PagoComponent,
    HotelComponent,
    VueloComponent,
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatListModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
