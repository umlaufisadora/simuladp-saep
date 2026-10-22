const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root',
    database: 'academia_db'
});

connection.connect((erro) => {
    if(erro) {
        console.log(
            'Erro ao contectar o Banco de Dados', erro
        );
        return;
    }
    console.log('Banco de Dados conectado com sucesso!');
});

module.exports = connection;