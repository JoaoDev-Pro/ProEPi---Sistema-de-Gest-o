# ProEPI - Sistema de Gestão de Estoque de EPIs

![React](https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=nodedotjs)
![Firebase](https://img.shields.io/badge/Database-Firebase-orange?style=for-the-badge&logo=firebase)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

> Um sistema SaaS moderno para simplificar a segurança do trabalho.

---

## 🖼️ Visão Geral do Projeto

O **ProEPI** é um sistema SaaS (Software as a Service) desenvolvido para modernizar e simplificar o controle de estoque de Equipamentos de Proteção Individual (EPIs). O projeto visa substituir planilhas manuais propensas a erros por uma interface visual intuitiva, focada na agilidade do setor de Segurança do Trabalho (SESMT).

### 🎯 Objetivo Principal
Resolver a desorganização no controle de EPIs em canteiros de obras e indústrias, centralizando entradas e saídas de estoque em um sistema web simples. O foco é eliminar burocracias (como cadastro complexo de colaboradores para baixas), priorizando a gestão **quantitativa e visual** dos itens.

---

## 🚀 Funcionalidades

- [x] **Autenticação Segura:** Login administrativo com JWT (JSON Web Token).
- [x] **Catálogo Visual:** Listagem de EPIs com fotos, descrição e status.
- [x] **Gestão de Produtos:** Cadastro, Edição e Exclusão de itens (CRUD).
- [x] **Controle de Estoque:** Registro de Entradas e Saídas com cálculo automático.
- [x] **Busca Inteligente:** Filtro instantâneo por nome do EPI (Search Bar).
- [x] **Dashboard Interativo:** Interface responsiva com design *Blueprint/Glassmorphism*.
- [x] **Indicadores Visuais:** Alerta de estoque baixo ou zerado.

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologias |
| :--- | :--- |
| **Frontend** | React.js (v18), CSS3 Moderno (Variables, Flex/Grid), Axios |
| **Backend** | Node.js, Express, JWT, Bcrypt |
| **Database** | Firebase Firestore (NoSQL), Firebase Storage (Imagens) |
| **DevOps** | Git, GitHub |

---

## ⚙️ Instruções de Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos
*   **Node.js** (v18 ou superior)
*   Uma conta no **Firebase** (Google Cloud) com um projeto criado.

### 1. Configuração do Backend

```bash
# 1. Entre na pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Crie um arquivo chamado .env na raiz da pasta backend e adicione:
# PORT=3001
# JWT_SECRET=sua_chave_secreta_aqui

# 4. Configure o Firebase
# Baixe sua chave privada (Service Account) no console do Firebase
# Renomeie para 'serviceAccountKey.json' e coloque em:
# backend/src/config/serviceAccountKey.json

# 5. Inicie o servidor
npm run dev
O backend rodará em: http://localhost:3001
2. Configuração do Frontend
code
Bash
# 1. Em um NOVO terminal, entre na pasta web
cd frontend/web

# 2. Instale as dependências
npm install

# 3. Inicie a aplicação React
npm start
O frontend abrirá automaticamente em: http://localhost:3000
🔐 Acesso ao Sistema (Ambiente de Teste)
Para fins de avaliação acadêmica e testes locais, utilize as credenciais abaixo para acessar o painel administrativo:
Campo	Credencial
URL Local	http://localhost:3000
E-mail	admin@proepi.com
Senha	123
📂 Estrutura do Repositório
code
Text
/
├── docs/                   # Documentação Técnica (Requisitos, Arquitetura)
├── frontend/               # Aplicação React (Interface)
├── backend/                # API Node.js (Regras de Negócio)
├── database/               # Modelagem de Dados
└── validation/             # Relatórios de Validação

```

<div align="center">
<small>Desenvolvido para fins acadêmicos - 2025</small>
</div>
