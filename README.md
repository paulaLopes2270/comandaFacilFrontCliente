# Sistema de Reservas de Mesas

Este projeto é uma aplicação Angular para gerenciamento de reservas de mesas em um restaurante. Permite aos usuários fazer novas reservas, visualizar suas reservas existentes e cancelar reservas. A aplicação inclui funcionalidades de autenticação e gerenciamento de cache para otimizar as requisições.

## Sumário

1. [Descrição Geral](#descrição-geral)
2. [Componente de Reserva](#componente-de-reserva)
   - [Template (HTML)](#template-html)
   - [Lógica (TypeScript)](#lógica-typescript)
3. [Componente de Reservas do Usuário](#componente-de-reservas-do-usuário)
   - [Template (HTML)](#template-html-1)
   - [Lógica (TypeScript)](#lógica-typescript-1)
4. [Interceptor de Autenticação](#interceptor-de-autenticação)
5. [Serviço de Autenticação](#serviço-de-autenticação)
6. [Serviço de Cache](#serviço-de-cache)
7. [Ambiente](#ambiente)
8. [Instruções de Implementação](#instruções-de-implementação)
9. [Testes](#testes)
10. [Considerações Finais](#considerações-finais)

## Descrição Geral

Este projeto Angular é uma aplicação para gerenciamento de reservas de mesas em um restaurante. Permite aos usuários fazer novas reservas, visualizar suas reservas existentes e cancelar reservas. Inclui funcionalidades de autenticação e gerenciamento de cache para otimizar as requisições.

## Componente de Reserva

### Template (HTML)

O `ReservaComponent` exibe um formulário para reserva de mesa e mensagens de carregamento. O template inclui campos para selecionar o número de pessoas, data e hora da reserva, e mensagens de erro.

### Lógica (TypeScript)

A lógica do `ReservaComponent` lida com:
- **Validação de Entrada**: Verifica se o número de pessoas e a data/hora são válidos.
- **Carregamento e Simulação**: Simula o carregamento inicial e carrega a lista de horários indisponíveis.
- **Submissão do Formulário**: Envia os dados da reserva para o servidor e lida com erros.

## Componente de Reservas do Usuário

### Template (HTML)

O `UserReservasComponent` mostra uma lista de reservas do usuário, com opções para cancelar reservas. Inclui uma mensagem caso não haja reservas.

### Lógica (TypeScript)

O `UserReservasComponent` é responsável por:
- **Carregamento das Reservas**: Obtém a lista de reservas do servidor.
- **Cancelamento de Reservas**: Permite ao usuário cancelar reservas e atualiza a lista.

## Interceptor de Autenticação

O `authInterceptor` adiciona o cabeçalho de autorização com o token JWT em todas as requisições, exceto para a rota de login.

## Serviço de Autenticação

O `AuthService` gerencia a autenticação do usuário, incluindo:
- **Login e Registro**: Faz login e registro de novos usuários.
- **Logout**: Desloga o usuário e limpa o cache.
- **Estado de Autenticação**: Observa e verifica se o usuário está autenticado.

## Serviço de Cache

O `CacheService` gerencia o cache de respostas HTTP:
- **Cache de Requisições**: Armazena e compartilha respostas para evitar chamadas repetidas.
- **Limpeza de Cache**: Permite limpar o cache para URLs específicas ou todo o cache.

## Ambiente

O arquivo `environment.ts` configura a URL base da API e outras configurações específicas do ambiente de desenvolvimento.

### Pré-requisitos

1. **Node.js**: Certifique-se de ter o Node.js instalado. Pode ser baixado [aqui](https://nodejs.org/).
2. **Angular CLI**: Instale o Angular CLI globalmente com o comando:
   ```bash
   npm install -g @angular/cli

## Instruções de Implementação

1. **Instalação**: Clone o repositório e instale as dependências com `npm install`.
2. **Configuração do Ambiente**: Configure o arquivo `environment.ts` com a URL da API.
3. **Execução**: Execute a aplicação com `ng serve` e acesse `http://localhost:4200` no navegador.

## Testes

- **Testes Unitários**: Utilize o framework de testes configurado para garantir a funcionalidade dos componentes e serviços.
- **Testes E2E**: Realize testes de ponta a ponta para verificar o fluxo completo da aplicação.

