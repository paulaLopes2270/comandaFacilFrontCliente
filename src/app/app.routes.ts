import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ReservaComponent } from './reserva/reserva.component';  
import { MesasComponent } from './mesas/mesas.component';  
import { authInterceptor } from './services/auth.interceptor';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menus/empresa/:id', component: MenuComponent },
  { path: 'mesas/empresa/:empresaId', component: MesasComponent },  
  { path: 'reservar/:empresaId/mesa/:mesaId', component: ReservaComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),  
  ]
};
