# DATA VISION
**O Data Vision é um projeto com o objetivo de transformar dados em soluções de impacto. A ideia consiste no cálculos de métricas-chave sobre clientes e transações e a integração com a groqAI para análise de dados**

**O projeto ainda está em desenvolvimento. Esse repositório está disponível para documentar o andamento do projeto e também a minha evolução como desenvolvedor backend.**

**Projeto em parceria com o Anderson Riquelmer que está responsável pelo front-end da Aplicação.**
[Github dele](https://github.com/riquelmer45)


# DataVision Backend

Backend para o sistema **DataVision**, desenvolvido em **Node.js** utilizando **Express**, **Prisma** e **PostgreSQL**. O projeto implementa autenticação via **JWT** e controle de acesso, garantindo que cada usuário só possa gerenciar seus próprios clientes e transações.

---

## Tecnologias Utilizadas

- **Node.js**  
- **Express.js**  
- **Prisma ORM**  
- **PostgreSQL**  
- **JWT** para autenticação  
- **Bcrypt** para hash de senhas  
- **ES Modules** (import/export)  
- **NODE MAILER** 

---

## Funcionalidades



### Usuários
- O cadastro de usuários é feito via email. Um email é mandado para o usuário com o acesso.
- Login com autenticação via JWT  
- Acesso às rotas protegido por middleware de autenticação  

### Clientes
- Cada usuário possui seus próprios clientes  
- Criação, listagem, busca por ID ou email e exclusão de clientes  
- Validação para impedir duplicidade de email por usuário  
- Isolamento total: usuários não veem clientes de outros usuários  

### Transações
- Cada cliente pode ter várias transações  
- Criação de transações vinculadas a clientes existentes  
- Listagem de transações apenas para clientes do usuário logado  
- Ao listar, retorna dados da transação + `customerId` do cliente vinculado  

---

## Estrutura do Projeto
**O projeto está utilizando Arquiteura em camadas com Auth, Repository, Service, Controller e Routes e utilizando GitFlow para o trabalho em equipe**



## Front-End





