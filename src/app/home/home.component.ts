import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { environment } from '../../environments/environment';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  empresas: any[] = [];
  isLoading: boolean = true; // Adiciona variável para controlar o estado de carregamento

  constructor(private http: HttpClient, private router: Router, private cacheService: CacheService) {}

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(): void {
    const empresasUrl = `${environment.apiUrl}/empresas`;
    this.cacheService.get(empresasUrl, this.http.get<any[]>(empresasUrl)).subscribe(
      (data: any[]) => {  // Especifica o tipo de 'data'
        this.empresas = data;
        this.isLoading = false; // Desativa o loading após o carregamento
      },
      (error: any) => {  // Especifica o tipo de 'error'
        console.error('Erro ao buscar empresas', error);
        this.isLoading = false; // Desativa o loading em caso de erro
      }
    );
  }

  navigateToMenu(empresa: any): void {
    console.log('Navegando para o menu da empresa com ID:', empresa.id);
    this.router.navigate(['/menus/empresa', empresa.id]);
  }
}
