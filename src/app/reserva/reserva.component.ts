import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { CacheService } from '../services/cache.service'; 

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reserva: any = {
    mesaId: '',
    numeroPessoas: 1,
    capacidadeMaxima: 1,
    dataHora: ''
  };
  mesaNumero: string = '';  // Variável para o número da mesa
  empresaId: string = '';
  minDate: Date = new Date();
  maxDate: Date = new Date();
  minPessoas: number = 1;  // mínimo como 1 pessoa por padrão
  isLoading: boolean = true; // Adiciona a propriedade de loading
  isSubmitting: boolean = false;  // Para desabilitar o botão de envio enquanto a reserva está sendo feita
  formErrors: any = {
    numeroPessoas: '',
    dataHora: ''
  };
  unavailableSlots: string[] = [];  // Horários já reservados ou ocupados

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private cacheService: CacheService) {}

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('empresaId') || '';
    const mesaId = this.route.snapshot.paramMap.get('mesaId') || '';

    // Capturar numeroMesa e capacidade via queryParams
    this.route.queryParams.subscribe(params => {
      const numeroMesa = params['numeroMesa'] || '';
      const capacidade = params['capacidade'] || '';

      if (mesaId && capacidade) {
        this.reserva.mesaId = mesaId;
        this.reserva.capacidadeMaxima = +capacidade; // O máximo é a capacidade da mesa
        this.reserva.numeroPessoas = this.reserva.capacidadeMaxima;  // Número inicial de pessoas é o máximo
        this.minPessoas = this.reserva.capacidadeMaxima - 1;  // O mínimo é a capacidade menos 1
      }
      this.mesaNumero = numeroMesa;  // Armazena o número da mesa
    });

    this.setDateLimits();  // Definir as datas limites ao inicializar o componente
    this.loadUnavailableSlots(); // Carregar horários já ocupados
    this.simulateLoading(); // Simula o carregamento dos dados
  }

  setDateLimits(): void {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(currentDate.getMonth() + 3);  // Adiciona 3 meses à data atual

    // Define os limites de data como Date para a validação interna
    this.minDate = currentDate;
    this.maxDate = maxDate;
  }

  formatDateToInputValue(date: Date): string {
    // Formato esperado pelo input datetime-local: yyyy-MM-ddTHH:mm
    return date.toISOString().slice(0, 16);
  }

  loadUnavailableSlots(): void {
    const unavailableUrl = `${environment.apiUrl}/reservas/empresa/${this.empresaId}/mesa/${this.reserva.mesaId}/unavailable-slots`;
    this.http.get<string[]>(unavailableUrl).subscribe(
      (slots) => {
        this.unavailableSlots = slots.map(slot => this.formatDateToInputValue(new Date(slot)));
      },
      (error) => {
        console.error('Erro ao carregar horários indisponíveis', error);
      }
    );
  }

  validarNumeroPessoas(): void {
    if (this.reserva.numeroPessoas > this.reserva.capacidadeMaxima) {
      this.formErrors.numeroPessoas = `O número de pessoas não pode ser maior que ${this.reserva.capacidadeMaxima}.`;
    } else if (this.reserva.numeroPessoas < this.minPessoas) {
      this.formErrors.numeroPessoas = `O número de pessoas deve ser no mínimo ${this.minPessoas}.`;
    } else {
      this.formErrors.numeroPessoas = '';
    }
  }

  validarDataHora(): void {
    if (!this.reserva.dataHora) {
        this.formErrors.dataHora = 'Data e hora são obrigatórias.';
    } else if (this.unavailableSlots.includes(this.reserva.dataHora)) {
        this.formErrors.dataHora = 'Este horário já está indisponível.';
    } else {
        this.formErrors.dataHora = '';
    }
  }

  fazerReserva(): void {
    // Validações antes de submeter o formulário
    this.validarNumeroPessoas();
    this.validarDataHora();
  
    if (!this.formErrors.numeroPessoas && !this.formErrors.dataHora) {
      this.reserva.area = 'INTERNA';  // ou pegue essa informação dinamicamente
      this.isSubmitting = true;  // Desativa o botão enquanto a requisição está em andamento
  
      const reservaUrl = `${environment.apiUrl}/reservas/empresa/${this.empresaId}/mesa/${this.reserva.mesaId}`;
      this.http.post(reservaUrl, this.reserva).subscribe(
        (response) => {
          console.log('Reserva feita com sucesso:', response);
          this.router.navigate(['/minhas-reservas']);  // Redireciona para a página de "Minhas Reservas"
        },
        (error) => {
          console.error('Erro ao fazer reserva:', error);
          if (error.status === 409) { // Supondo que 409 indica conflito, mesa já reservada
            this.formErrors.general = 'A mesa já está reservada para essa data e horário. Por favor, escolha outro horário.';
          } else {
            this.formErrors.general = 'A mesa já está reservada para essa data e horário. Por favor, escolha outro horário.';
          }
          this.isSubmitting = false;  // Reativa o botão em caso de erro
        }
      );
    }
  }
  

  abrirCalendario(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.showPicker();  // Chama o seletor de calendário
  }

  simulateLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
  }
}
