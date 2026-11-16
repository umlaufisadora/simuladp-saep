
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();

server.use(cors());
server.use(express.json());

// Rota para testar a API
server.get('/', (req, res) => {
    res.json({ message: 'API da Academia funcionando!' });
});

// Login
server.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Informe usuário e senha.'
        });
    }

    const sql = `
        SELECT id, nome_completo
        FROM alunos
        WHERE nome_completo = ? AND senha = ?
    `;

    connection.query(sql, [username, password], (erro, resultado) => {
        if (erro) {
            console.error('Erro no login:', erro);

            return res.status(500).json({
                success: false,
                message: 'Erro ao realizar login.'
            });
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Usuário ou senha incorretos.'
            });
        }

        const aluno = resultado[0];

        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso!',
            aluno: {
                id: aluno.id,
                nome: aluno.nome_completo
            }
        });
    });
});

const PORT = 3030;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
