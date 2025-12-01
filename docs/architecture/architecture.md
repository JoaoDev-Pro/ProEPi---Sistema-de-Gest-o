# Documentação de Arquitetura - ProEPI

## Visão Geral
O ProEPI utiliza uma arquitetura baseada em serviços RESTful, onde o Frontend (React) consome dados de uma API (Node.js) que atua como middleware de segurança e regras de negócio para o banco de dados (Firebase).

## Diagrama de Componentes

```text
[Cliente React] 
      |
   (HTTPS)
      |
[API Gateway / Express App]
      |
      +--- [Auth Service] (Valida JWT e Senhas)
      +--- [Inventory Service] (CRUD de Produtos)
      +--- [Operations Service] (Lógica de + e - Estoque)
      |
[Firebase Admin SDK]
      |
[Google Cloud Firestore]



## Decisões Técnicas

1. Backend em Node.js com Express
Optou-se pelo Node.js pela sua eficiência em I/O assíncrono, ideal para APIs que lidam com muitas requisições de leitura/escrita simultâneas. A estrutura de pastas simula microserviços (auth, inventory, operations) para facilitar manutenção futura.

2. Firebase Firestore (NoSQL)
A escolha do NoSQL se deve à natureza semi-estruturada dos dados dos produtos (imagens, descrições variadas) e pela facilidade de escalabilidade horizontal. Além disso, a integração com o Admin SDK garante segurança total, ignorando regras de cliente.

3. Autenticação JWT
Ao contrário de sessões via cookie, o JWT permite que a API seja stateless (sem estado), facilitando o deploy em plataformas serverless como Render ou Vercel.

Modelo de Dados (Schema Lógico)

Collection: users
email (string)
password_hash (string/bcrypt)
role (string)

Collection: products
name (string)
description (string)
photoUrl (string/base64)
currentStock (number)
createdAt (timestamp)

Collection: movements
productId (ref)
type ("IN" | "OUT")
quantity (number)
timestamp (date)