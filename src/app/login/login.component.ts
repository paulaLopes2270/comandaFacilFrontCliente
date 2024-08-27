import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = {
      username: this.email,
      password: this.password
    };

    this.authService.login(credentials.username, credentials.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login falhou. Verifique suas credenciais.');
      }
    );
  }
}
