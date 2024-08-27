import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { CacheService } from '../services/cache.service';
import { forkJoin } from 'rxjs';  

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  empresaId: string = '';  // ID da empresa obtido a partir da rota
  menus: any[] = [];  // Armazena os menus da empresa
  empresa: any = {};  // Armazena os detalhes da empresa
  loading: boolean = true;  // Variável de controle para o estado de carregamento
  showInfo: boolean = false;  // Controla a visibilidade das informações adicionais

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cacheService: CacheService  
  ) {}

  ngOnInit(): void {
    // Obtém o ID da empresa a partir da URL
    this.empresaId = this.route.snapshot.paramMap.get('id') || '';
    
    // Chama as requisições para buscar os menus e detalhes da empresa
    this.loadEmpresaData();
  }

  // Método para carregar tanto os menus quanto os detalhes da empresa
  loadEmpresaData(): void {
    const empresaUrl = `${environment.apiUrl}/empresas/${this.empresaId}`;
    const menuUrl = `${environment.apiUrl}/menus/empresa/${this.empresaId}`;
    
    forkJoin({
      empresa: this.cacheService.get(empresaUrl, this.http.get<any>(empresaUrl)),
      menus: this.cacheService.get(menuUrl, this.http.get<any[]>(menuUrl))
    }).subscribe(
      (result: any) => {
        this.empresa = result.empresa;
        this.menus = result.menus || [];
        this.loading = false;  // Desativa o estado de carregamento após ambas as requisições serem concluídas
      },
      (error: any) => {
        console.error('Erro ao carregar os dados da empresa ou do menu', error);
        this.loading = false;  // Desativa o estado de carregamento em caso de erro
      }
    );
  }

  // Método para alternar a visibilidade das informações adicionais
  toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }

  // Método para redirecionar para a página de reservas
  fazerReserva(): void {
    this.router.navigate([`/mesas/empresa/${this.empresaId}`]);
  }

  // Obtém as categorias únicas dos menus
  getCategorias(): string[] {
    return [...new Set(this.menus.map(menu => menu.categoria))];
  }

  // Filtra os menus por categoria
  getMenuByCategoria(categoria: string): any[] {
    return this.menus.filter(menu => menu.categoria === categoria);
  }
}
