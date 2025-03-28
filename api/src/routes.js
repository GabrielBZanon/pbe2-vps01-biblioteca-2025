const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

const Aluno = require('./controllers/aluno');
const Emprestimo = require('./controllers/emprestimo');
const Livro = require('./controllers/livro');

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.put('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);


routes.post('/emprestimo', Emprestimo.create);
routes.get('/emprestimo', Emprestimo.read);
routes.get('/emprestimo/:id', Emprestimo.readOne);
routes.put('/emprestimo/:id', Emprestimo.update);
routes.delete('/emprestimo/:id', Emprestimo.remove);
routes.get('/emprestimo/:id/multa', Emprestimo.calcularMulta);

routes.post('/livro', Livro.create);
routes.get('/livro', Livro.read);
routes.get('/livro/:id', Livro.readOne);
routes.put('/livro/:id', Livro.update);
routes.delete('/livro/:id', Livro.remove);


module.exports = routes;