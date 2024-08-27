import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { CacheService } from '../services/cache.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  mesas$: Observable<any[]> | null = null;
  empresaId: string = '';
  isLoading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('empresaId') || '';
    this.getMesasByEmpresa(this.empresaId);
  }

  getMesasByEmpresa(empresaId: string): void {
    const mesasUrl = `${environment.apiUrl}/mesas/empresa/${empresaId}`;
    this.mesas$ = this.cacheService.get(mesasUrl, this.http.get<any[]>(mesasUrl));
    this.mesas$.subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar mesas', error);
        this.isLoading = false;
      }
    );
  }

  selecionarMesa(mesa: any): void {
    this.router.navigate([`/reservar/${this.empresaId}/mesa/${mesa.id}`], { 
      queryParams: { numeroMesa: mesa.numero, capacidade: mesa.capacidade }
    });
  }
}
