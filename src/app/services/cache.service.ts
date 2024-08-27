import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: Observable<any> } = {};

  get(url: string, request$: Observable<any>): Observable<any> {
    if (!this.cache[url]) {
      this.cache[url] = request$.pipe(
        shareReplay(1)  // Compartilha o valor entre múltiplos assinantes e armazena o último valor
      );
    }
    return this.cache[url];
  }

  clearCache(url: string): void {
    delete this.cache[url];  // Limpa o cache de uma URL específica
  }

  clearAllCache(): void {
    this.cache = {};  // Limpa todo o cache
  }
}
