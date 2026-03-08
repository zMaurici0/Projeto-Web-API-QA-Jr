
## Projeto QA Automation – Web & API Testing (Automation Exercise)

Este projeto demonstra habilidades práticas de Quality Assurance (QA) aplicadas a testes Web e de API, utilizando ferramentas modernas de automação e validação de testes.

O objetivo deste repositório é praticar atividades comuns do dia a dia de um QA Engineer, como validação de APIs, automação de testes e verificação do comportamento esperado da aplicação.

O projeto foi feito utilizando o site Automation Exercise e simula cenários reais de testes, incluindo:

- Validação de respostas de API
- Verificação de status codes HTTP
- Criação de testes automatizados
- Validação do comportamento esperado da aplicação

## 📋 Estrutura do Projeto
```
Projeto-Web-API-QA-Jr/
│
├── .github/
├── helper/
├── pages/
├── tests/
│   ├── api/
│   ├── fixtures/
│   └── web/
│
├── test-results/
├── playwright-report/
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── .gitignore
```

## 🎯 Fases de Teste Realizadas

1️⃣ Testes de API

Objetivo: Validar endpoints da API e garantir que as respostas retornem os dados e status codes esperados.

O que foi feito:
- Criação de testes automatizados para diferentes endpoints da API
- Validação de status codes das requisições
- Verificação da estrutura das respostas em JSON
- Validação de mensagens retornadas pela API

Resultados:

- Endpoints testados com sucesso
- Validação de respostas e códigos HTTP
- Confirmação do comportamento esperado da API

2️⃣ Testes Web (E2E)

Objetivo: Validar funcionalidades da aplicação web simulando ações reais do usuário.

O que foi feito:

- Automação de cenários de navegação da aplicação
- Verificação de elementos da interface
- Validação de URLs e páginas acessadas
- Teste de funcionalidades como busca de produtos e visualização de detalhes

Resultados:

- Fluxos principais da aplicação validados
- Elementos da interface verificados automaticamente
- Cenários executados com sucesso

## 💼 Skills Demonstradas

- [x] Page Object Model (POM)
- [x] Testes End-to-End (E2E)
- [x] Testes Funcionais e de Interface do Usuário (UI)
- [x] Testes de API (REST – GET, POST, PUT, DELETE)
- [x] Testes de CRUD em API
- [x] Testes Negativos
- [x] Validação de Respostas (Status Codes e respostas da API)
- [x] Testes de Integração

## 📊 Estatísticas do Projeto

- Testes Web: 14
- Testes de API: 12
- Total de Casos de Teste: 26
- Scripts de Teste: 18

## 🛠️ Ferramentas & Tecnologias

| Categoria | Ferramentas |
|----------|-------------|
| Automação de Testes | Playwright |
| Linguagem | JavaScript |
| Ambiente de Execução | Node.js |
| Testes de API | Playwright Request API |
| Testes Web | Playwright Browser Automation |
| Versionamento | Git, GitHub |

## ▶️ Como rodar os testes

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2️⃣ Acessar a pasta do projeto

```bash
cd seu-repositorio
```

### 3️⃣ Instalar as dependências

```bash
npm install
```

### 4️⃣ Instalar os navegadores do Playwright

```bash
npx playwright install
```

### 5️⃣ Formas de rodar os testes

- rodar todos
```bash
npx playwright test
```
- rodar só os testes de API
```bash
npx playwright test tests/api
```
- rodar só os testes de Web
```bash
npx playwright test tests/web
```

### 6️⃣ Abrir o relatório de testes

```bash
npx playwright show-report
```

## 🌐 Aplicação Testada

Site utilizado para testes:
https://automationexercise.com/
