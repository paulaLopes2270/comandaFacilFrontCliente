import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/login`;
  private registerUrl = `${environment.apiUrl}/auth/register`; // URL para registro
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cacheService: CacheService  
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response: { token: string }) => {
        localStorage.setItem('auth_token', response.token);
        this.authState.next(true);  // Atualiza o estado de autenticação
      })
    );
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, registerData);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.authState.next(false);  // Atualiza o estado de autenticação
    this.cacheService.clearAllCache();  // Limpa todo o cache ao deslogar
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();  // Permite que outros componentes observem o estado de autenticação
  }
}
