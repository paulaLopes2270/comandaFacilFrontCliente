import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  mesas: any[] = [];
  empresaId: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtenha o ID da empresa a partir da URL
    this.empresaId = this.route.snapshot.paramMap.get('empresaId') || '';
    this.getMesasByEmpresa(this.empresaId);
  }

  getMesasByEmpresa(empresaId: string): void {
    // Chame a API para obter as mesas da empresa especificada
    const mesasUrl = `${environment.apiUrl}/mesas/empresa/${empresaId}`;
    this.http.get<any[]>(mesasUrl).subscribe(
      (data) => {
        this.mesas = data;
      },
      (error) => {
        console.error('Erro ao buscar mesas', error);
      }
    );
  }

  selecionarMesa(mesa: any): void {
    // Redirecionar para a página de reserva com a mesa selecionada
    this.router.navigate([`/reservar/${this.empresaId}/mesa/${mesa.id}`], {
      queryParams: { capacidade: mesa.capacidade }
    });
  }
}
