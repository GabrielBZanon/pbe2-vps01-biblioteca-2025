const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const livro = await prisma.livro.create({
            data: {
                titulo: req.body.titulo,
                autor: req.body.autor,
                prateleira: req.body.prateleira
            }
        });
        return res.status(201).json(livro);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    try {
        // Opção para incluir filtros de busca
        const where = {};
        
        if (req.query.titulo) {
            where.titulo = { contains: req.query.titulo };
        }
        if (req.query.autor) {
            where.autor = { contains: req.query.autor };
        }
        if (req.query.prateleira) {
            where.prateleira = req.query.prateleira;
        }

        const livros = await prisma.livro.findMany({
            where,
            orderBy: {
                titulo: 'asc'
            }
        });
        return res.json(livros);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const readOne = async (req, res) => {
    try {
        const livro = await prisma.livro.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        
        return res.json(livro);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const livro = await prisma.livro.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                titulo: req.body.titulo,
                autor: req.body.autor,
                prateleira: req.body.prateleira
            }
        });
        return res.status(200).json(livro);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.livro.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({ 
                error: 'Não é possível excluir o livro pois está vinculado a um empréstimo' 
            });
        }
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };