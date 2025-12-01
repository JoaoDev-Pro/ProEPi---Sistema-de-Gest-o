# 📚 Documentação da API REST - ProEPI

Esta documentação detalha os endpoints disponíveis na API do ProEPI. Todas as respostas são retornadas em formato **JSON**.

**Base URL:**
http://localhost:3001/api
code
Code
---

## 🔐 Autenticação

### Realizar Login
Autentica um administrador e retorna o token de sessão.

![](https://img.shields.io/badge/POST-%2Fauth%2Flogin-49cc90?style=for-the-badge)

**Corpo da Requisição (JSON):**

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `email` | `string` | Sim | E-mail do administrador. |
| `password` | `string` | Sim | Senha do administrador. |

**Exemplo de Sucesso (200 OK):**
```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "admin@proepi.com",
    "role": "ADMIN"
  }
}
📦 Produtos (EPIs)
⚠️ Atenção: Todos os endpoints abaixo exigem o cabeçalho de autorização:
Authorization: Bearer <SEU_TOKEN_AQUI>
Listar Produtos
Retorna todos os EPIs cadastrados no banco de dados.
![alt text](https://img.shields.io/badge/GET-%2Fproducts-61affe?style=for-the-badge)
Exemplo de Sucesso (200 OK):
code
JSON
[
  {
    "id": "7b8a9c...",
    "name": "Capacete de Segurança",
    "description": "Classe B - Amarelo",
    "photoUrl": "data:image/png;base64...",
    "currentStock": 50,
    "createdAt": "2024-11-27T10:00:00.000Z"
  }
]
Cadastrar Novo Produto
Adiciona um novo EPI ao catálogo.
![alt text](https://img.shields.io/badge/POST-%2Fproducts-49cc90?style=for-the-badge)
Corpo da Requisição (JSON):
Parâmetro	Tipo	Obrigatório	Descrição
name	string	Sim	Nome do EPI.
description	string	Não	Detalhes técnicos do item.
photoUrl	string	Sim	Imagem em formato Base64.
Exemplo de Sucesso (201 Created):
code
JSON
{
  "id": "new_id_123",
  "name": "Luva de Raspa",
  "currentStock": 0
}
Excluir Produto
Remove um item do catálogo permanentemente.
![alt text](https://img.shields.io/badge/DELETE-%2Fproducts%2F%3Aid-f93e3e?style=for-the-badge)
Parâmetros de URL:
:id - O ID único do produto (ex: products/abc12345).
Exemplo de Sucesso (200 OK):
code
JSON
{
  "message": "Produto deletado com sucesso"
}
🔄 Movimentações (Estoque)
Registrar Entrada ou Saída
Altera a quantidade em estoque de um produto específico.
![alt text](https://img.shields.io/badge/POST-%2Fmovements-49cc90?style=for-the-badge)
Corpo da Requisição (JSON):
Parâmetro	Tipo	Obrigatório	Descrição
productId	string	Sim	ID do produto a ser movimentado.
type	string	Sim	Deve ser "IN" (Entrada) ou "OUT" (Saída).
quantity	integer	Sim	Quantidade a ser movimentada (maior que 0).
Exemplo de Requisição (Entrada de 10 itens):
code
JSON
{
  "productId": "abc12345",
  "type": "IN",
  "quantity": 10
}
Erros Comuns:
400 Bad Request: Estoque insuficiente para saída ou tipo inválido.
404 Not Found: Produto não encontrado.
📜 Códigos de Status HTTP
Código	Significado
200	Sucesso (OK).
201	Criado com sucesso.
401	Não autorizado (Token inválido ou ausente).
403	Proibido (Token sem permissão).
404	Recurso não encontrado.
500	Erro interno do servidor.
