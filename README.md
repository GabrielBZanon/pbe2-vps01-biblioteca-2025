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
# 📚 API Biblioteca Acme

Uma API para gerenciamento de alunos, livros e empréstimos.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Prisma** - ORM para interagir com o banco de dados
- **Express** - Framework para criação da API
- **MySQL** - Banco de dados relacional

---

## 📌 Passo a Passo para Execução

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/biblioteca-acme.git
cd biblioteca-acme/api
```

### 2️⃣ Instalar as Dependências
```bash
npm install
```

### 3️⃣ Configurar o Ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas credenciais do MySQL.

### 4️⃣ Executar as Migrações do Banco
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Iniciar o Servidor
```bash
npm start
```
A API estará disponível em: **http://localhost:3000**

---

## 🔧 Endpoints Principais

### 📌 Alunos
- **POST /alunos** - Cadastra um novo aluno
- **GET /alunos** - Lista todos os alunos
- **GET /alunos/:ra** - Busca um aluno específico pelo RA

### 📖 Livros
- **POST /livros** - Cadastra um novo livro
- **GET /livros** - Lista todos os livros

### 🔄 Empréstimos
- **POST /emprestimos** - Registra um novo empréstimo
- **PUT /emprestimos/:id** - Atualiza um empréstimo
- **GET /emprestimos/:id/multa** - Calcula multa por atraso

---

## 📌 Exemplo de Uso

### Cadastrar um Aluno
```bash
curl -X POST http://localhost:3000/alunos \
-H "Content-Type: application/json" \
-d '{"ra":"20230001","nome":"Maria Silva","telefone":"11999999999"}'
```

---

## ℹ️ Mais Informações

### Visualizar o Banco de Dados
```bash
npx prisma studio
```

### Reiniciar o Banco (⚠️ Apaga todos os dados)
```bash
npx prisma migrate reset
```

