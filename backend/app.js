const express = require('express');
const cors = require('cors');
const connection = require('./db');
const db = db.js

const server = express();



server.use(cors());
server.use(express.json());

server.post('/login', async (req, res) =>
{
    const {username, password} = req.body;

    try{
        const sql = 'SELECT * FROM alunos WHERE nome_completo = ? AND senha = ?'
    
        connection.query(
            sql,[username, password], (erro, resultado) => {
                if(erro)
                {
                    return res.status(500).json({erro : erro.message})
                }

                if(resultado.length > 0)
                {
                    const aluno = resultado[0];

                    return res.status(200).json({
                        success: true, 
                        message: "Login realisado com sucesso!",
                        aluno: {
                            id: aluno.id,
                            nome: aluno.nome_completo
                        }
                    });
                }
                else
                {
                    return res.status(401).json({
                        success: false,
                        message: "Nome de usuário ou senha incorretos"
                    });
                }

            }
        )
    }
    catch (erro)
    {
        return res.status(500).json({erro: error.message});
    }
});

const PORT = 3030;




server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
});