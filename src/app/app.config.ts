import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MesasComponent } from './mesas/mesas.component';
import { ReservaComponent } from './reserva/reserva.component';
import { UserReservasComponent } from './user-reservas/user-reservas.component';
import { RegisterUserComponent } from './register-user/register-user.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent }, // Adiciona a nova rota
  { path: 'home', component: HomeComponent },
  { path: 'menus/empresa/:id', component: MenuComponent },
  { path: 'mesas/empresa/:empresaId', component: MesasComponent },
  { path: 'reservar/:empresaId/mesa/:mesaId', component: ReservaComponent },
  { path: 'minhas-reservas', component: UserReservasComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ]
};
