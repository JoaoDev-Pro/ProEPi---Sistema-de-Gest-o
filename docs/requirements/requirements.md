### 2. Arquivo de Requisitos: `docs/requirements/requirements.md`

Este documento detalha os requisitos funcionais e não funcionais do sistema ProEPI, definidos para garantir o controle eficiente de estoque de Equipamentos de Proteção Individual.

# Especificação de Requisitos de Software (SRS) - ProEPI

## 1. Requisitos Funcionais (RF)
*O que o sistema deve fazer.*

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| **RF-01** | Autenticação Administrativa | O sistema deve permitir login via e-mail e senha, retornando um token de sessão seguro. | Alta |
| **RF-02** | Cadastro de EPIs | O sistema deve permitir criar novos itens com Nome, Descrição e Foto. | Alta |
| **RF-03** | Movimentação de Estoque | O sistema deve permitir registrar entradas (soma) e saídas (subtração) de quantidades. | Alta |
| **RF-04** | Visualização de Dashboard | O sistema deve exibir cards com foto, nome e quantidade atual do estoque. | Média |
| **RF-05** | Busca de Itens | O sistema deve permitir filtrar EPIs pelo nome em tempo real. | Média |
| **RF-06** | Exclusão de Itens | O administrador pode remover itens obsoletos do catálogo. | Baixa |

## 2. Requisitos Não Funcionais (RNF)
*Como o sistema deve ser (restrições técnicas e qualidade).*

| ID | Requisito | Descrição |
|---|---|---|
| **RNF-01** | Arquitetura | O sistema deve seguir uma arquitetura cliente-servidor separada (Frontend desacoplado do Backend). |
| **RNF-02** | Segurança | A comunicação com a API deve ser protegida via Token JWT (Bearer Authentication). |
| **RNF-03** | Banco de Dados | Utilização de banco NoSQL (Firestore) para flexibilidade de schema. |
| **RNF-04** | Usabilidade | Interface responsiva e limpa, seguindo princípios de UX para minimizar erros operacionais. |
| **RNF-05** | Performance | O Backend deve processar requisições de imagem de até 50MB. |
