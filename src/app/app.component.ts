import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component'; 
import { NgIf } from '@angular/common';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, NgIf],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meu-app';
  showHeader: boolean = true;

  constructor(private router: Router) {
    // Verifica a rota atual ao inicializar o componente e ao mudar a rota
    this.router.events.subscribe(() => {
      this.showHeader = !(
        this.router.url === '/login' || 
        this.router.url === '/register' ||
        this.router.url === '/register-user'
      );
    });
  }
}
