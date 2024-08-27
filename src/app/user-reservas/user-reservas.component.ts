import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reservas.component.html',
  styleUrls: ['./user-reservas.component.css']
})
export class UserReservasComponent implements OnInit {
  reservas: any[] = [];
  isLoading: boolean = true;  // Indica se está carregando os dados
  isCancelling: boolean = false;  // Indica se está cancelando uma reserva

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    this.isLoading = true;  // Ativa o estado de carregamento
    this.http.get<any[]>(`${environment.apiUrl}/reservas/minhas`).subscribe(
      (data) => {
        this.reservas = data;
        this.isLoading = false;  // Desativa o estado de carregamento após receber os dados
      },
      (error) => {
        console.error('Erro ao buscar reservas', error);
        this.isLoading = false;  // Desativa o estado de carregamento mesmo em caso de erro
      }
    );
  }

  cancelarReserva(reservaId: number): void {
    // Exibe a confirmação antes de proceder com o cancelamento
    const confirmCancel = confirm('Você tem certeza que deseja cancelar esta reserva?');
    
    if (confirmCancel) {
      this.isCancelling = true;  // Ativa o estado de cancelamento
      this.http.delete(`${environment.apiUrl}/reservas/cancelar/${reservaId}`, { responseType: 'text' }).subscribe(
        (response) => {
          // Se o backend retornar texto simples, ainda consideramos sucesso
          console.log(response);  // Log da resposta para depuração
          alert(response || 'Reserva cancelada com sucesso.');  // Exibe o texto retornado ou uma mensagem genérica
          this.getReservas();  // Atualiza a lista de reservas
          this.isCancelling = false;  // Desativa o estado de cancelamento
        },
        (error) => {
          console.error('Erro ao cancelar reserva', error);
          alert('Erro ao cancelar reserva. Verifique se está dentro do prazo de cancelamento.');
          this.isCancelling = false;  // Desativa o estado de cancelamento em caso de erro
        }
      );
    }
  }

  // Método para verificar se a reserva já passou
  isReservaPassada(dataHora: string): boolean {
    const dataReserva = new Date(dataHora);
    const agora = new Date();
    return dataReserva < agora;
  }
}
