# BIBLIOTECA ACME API
Situação de Aprendizagem - Back-End (Node.JS, JavaSript, VsCode, ORM Prisma, Insomnia)
## Contextualização
A BIBLIOTECA ACME é a biblioteca da escola ACME, é nossa cliente e necessita de um sistema Web para registro dos empréstimos de livros.<br>O P.O. após uma visita ao cliente, elaborou o DER e UML DC(Diagrama de Classes) a seguir e elencou os requisitos funcionais.<br>
![DER e DC](./docs/der-dc.png)
## Desafio
Desenvolver as funcionalidades conforme requisitos

### Requisitos funcionais
- [RF001] O sistema deve permitir o CRUD de alunos.
    - [RF001.1] A rota **readOne** do **aluno** deve mostrar os dados de um aluno e seus empréstimos, contendo os dados dos livros emprestados.
- [RF002] O sistema deve permitir o CRUD de emprestimo.
    - [RF002.1] O sistema deve associar o emprestimo a um aluno e a um livro.
    - [RF002.2] Ao cadastrar um novo emprestimo **create** no controller, a data e hora da **retirada** deve ser gerada pelo Banco de Dados @dedault(now()).
    - [RF002.3] Ao cadastrar uma novo emprestimo **create** no controller, a **devolucao**, deve ser nula **"?"** pois será preenchida na rota **update** quando o aluno devolver o livro.
    - [RF002.4] Se ao realizar **update** o campo **devolucao** for enviado o sistema deve calcular a **multa** que segue o seguinte critério:
        - O aluno pode ficar apenas 3 dias com o livro.
        - Se a data da devolução for mais de três dias após a data da retirada, deverá ser cobrada uma multa de 10.00 por dia.

### Casos de teste (Insomnia)
- [CT001] Deve ser cadastrado pelo menos 5 alunos.
- [CT002] Cadastre, altere e exclua um aluno.
- [CT003] Deve ser cadastrado pelo menos 10 livros.
- [CT004] Cadastre uma emprestimo para cada aluno.
    - [CT004.1] Pelo menos dois alunos devem ter dois ou mais emprestimos cadastrados.
- [CT004] Cadastre, altere e exclua um emprestimo.
- [CT005] Altere pelo menos dois emprestimos preenchendo a **devolucao** com data 4 dias maior que a retirada para testar o cálculo da **multa**.

## Tecnologias
Biblioteca ACME - API de Gerenciamento de Empréstimos
📋 Tecnologias Utilizadas
Node.js (v18+)

Express (Framework web)

Prisma (ORM para banco de dados)

MySQL (Banco de dados)

Insomnia (Teste de API)

Git (Controle de versão)

## Passo a Passo de como executar a API
Pré-requisitos
Node.js instalado (v18 ou superior)

MySQL instalado e rodando

Git instalado (opcional)

Insomnia ou Postman para testes

🔧 Configuração Inicial
Clone o repositório

bash
Copy
git clone https://github.com/seu-usuario/biblioteca-acme.git
cd biblioteca-acme/api
Instale as dependências

bash
Copy
npm install
Configure o ambiente

Crie um arquivo .env na raiz do projeto com:

Copy
DATABASE_URL="mysql://usuario:senha@localhost:3306/biblioteca_acme"
PORT=3000
Configuração do Banco de Dados
Aplique as migrações

bash
Copy
npx prisma migrate dev --name init
Gere o cliente Prisma

bash
Copy
npx prisma generate
▶️ Executando a API
Inicie o servidor

bash
Copy
npm start
O servidor estará disponível em: http://localhost:3000

Teste os endpoints no Insomnia:

Importe a coleção de requisições (arquivo .json incluso no projeto)

Casos de Teste
Execute no Insomnia na ordem:

[CT001] Cadastre 5 alunos

[CT002] Teste CRUD completo de um aluno

[CT003] Cadastre 10 livros

[CT004] Cadastre empréstimos para cada aluno

[CT005] Teste cálculo de multa com devoluções atrasadas

Estrutura da API
Copy
📦 api
├── 📂 prisma
│   ├── 📄 schema.prisma       # Definição do schema do banco
│   └── 📂 migrations          # Migrações do banco
├── 📂 src
│   ├── 📂 controllers         # Lógica dos endpoints
│   ├── 📄 routes.js           # Definição das rotas
│   └── 📄 server.js           # Configuração do servidor
├── 📄 .env                    # Variáveis de ambiente
└── 📄 package.json            # Dependências do projeto
🔍 Documentação dos Endpoints
Método	Endpoint	Descrição
POST	/alunos	Cadastra novo aluno
GET	/alunos	Lista todos os alunos
GET	/alunos/{ra}	Busca aluno específico
PUT	/alunos/{ra}	Atualiza dados do aluno
DELETE	/alunos/{ra}	Remove um aluno
Documentação completa disponível no arquivo API_DOCS.md

🛠 Comandos Úteis
Resetar banco de dados (cuidado: apaga todos os dados)

bash
Copy
npx prisma migrate reset
Abrir interface do Prisma Studio

bash
Copy
npx prisma studio
Verificar status do banco

bash
Copy
npx prisma migrate status
