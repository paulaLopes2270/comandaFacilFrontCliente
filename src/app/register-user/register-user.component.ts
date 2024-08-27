import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registerData = {
    username: '',
    email: '',
    telefone: '', 
    password: '',
    role: 'USUARIO' 
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        // Redireciona para a página de login ou outra página após o registro
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = 'Erro ao cadastrar usuário. Verifique os dados.';
      }
    });
  }
}
