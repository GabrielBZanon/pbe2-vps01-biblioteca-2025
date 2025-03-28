const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.create({
            data: {
                retirada: new Date(req.body.retirada || Date.now()),
                devolucao: new Date(req.body.devolucao),
                alunoRa: req.body.alunoRa,
                livroId: parseInt(req.body.livroId)
            },
            include: {
                aluno: true,
                livro: true
            }
        });
        return res.status(201).json(emprestimo);
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({ 
                error: 'Aluno ou livro não encontrado. Verifique o RA do aluno e o ID do livro.' 
            });
        }
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    try {
        const where = {};
        
        // Filtros opcionais
        if (req.query.alunoRa) {
            where.alunoRa = req.query.alunoRa;
        }
        if (req.query.livroId) {
            where.livroId = parseInt(req.query.livroId);
        }
        if (req.query.ativo) {
            const now = new Date();
            where.OR = [
                { devolucao: { gt: now } }, // Empréstimos não devolvidos
                { devolucao: null } // Caso devolucao seja nullable
            ];
        }

        const emprestimos = await prisma.emprestimo.findMany({
            where,
            include: {
                aluno: true,
                livro: true
            },
            orderBy: {
                retirada: 'desc'
            }
        });
        return res.json(emprestimos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const readOne = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                aluno: true,
                livro: true
            }
        });
        
        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        
        return res.json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const data = {
            devolucao: req.body.devolucao ? new Date(req.body.devolucao) : undefined,
            multa: req.body.multa !== undefined ? parseFloat(req.body.multa) : undefined
        };

        const emprestimo = await prisma.emprestimo.update({
            where: {
                id: parseInt(req.params.id)
            },
            data,
            include: {
                aluno: true,
                livro: true
            }
        });
        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.emprestimo.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

const calcularMulta = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                aluno: true,
                livro: true
            }
        });

        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        const hoje = new Date();
        const dataDevolucao = new Date(emprestimo.devolucao);
        
        // Calcula dias de atraso (apenas se a devolução estiver no passado)
        const diasAtraso = hoje > dataDevolucao 
            ? Math.ceil((hoje - dataDevolucao) / (1000 * 60 * 60 * 24))
            : 0;
        
        const multa = diasAtraso * 2.5; // R$ 2,50 por dia de atraso

        // Atualiza o empréstimo com o valor da multa
        const emprestimoAtualizado = await prisma.emprestimo.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                multa: multa
            },
            include: {
                aluno: true,
                livro: true
            }
        });

        return res.json({
            diasAtraso: diasAtraso,
            multa: multa,
            emprestimo: emprestimoAtualizado
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { 
    create, 
    read, 
    readOne, 
    update, 
    remove, 
    calcularMulta 
};