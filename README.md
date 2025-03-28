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
Node.js

Prisma (para banco de dados)

Express (para criar a API)

MySQL (banco de dados)
## Passo a Passo de como executar a API
🚀 Instalação
Clone o repositório:

bash
Copy
git clone https://github.com/seu-usuario/biblioteca-acme.git
cd biblioteca-acme/api
Instale as dependências:

bash
Copy
npm install
Configure o ambiente:

bash
Copy
cp .env.example .env
Edite o arquivo .env com suas credenciais do MySQL.

Execute as migrações do banco:

bash
Copy
npx prisma migrate dev --name init
Inicie o servidor:

bash
Copy
npm start
🔧 Endpoints Principais
Alunos
POST /alunos - Cadastra novo aluno

GET /alunos - Lista todos os alunos

GET /alunos/:ra - Busca aluno específico

Livros
POST /livros - Cadastra novo livro

GET /livros - Lista todos os livros

Empréstimos
POST /emprestimos - Registra novo empréstimo

PUT /emprestimos/:id - Atualiza empréstimo

GET /emprestimos/:id/multa - Calcula multa por atraso

📌 Exemplo de Uso
Cadastrar aluno:

bash
Copy
curl -X POST http://localhost:3000/alunos \
-H "Content-Type: application/json" \
-d '{"ra":"20230001","nome":"Maria Silva","telefone":"11999999999"}'
ℹ️ Mais Informações
Para visualizar o banco de dados:

bash
Copy
npx prisma studio
Para reiniciar o banco (cuidado: apaga todos os dados):

bash
Copy
npx prisma migrate reset
A API estará disponível em http://localhost:3000
