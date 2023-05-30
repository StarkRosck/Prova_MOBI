const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'entrega' 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida com sucesso');
});

app.post('/signup', (req, res) => {
  const { name, email, password, telephones } = req.body;

  if (!name || !email || !password || !telephones) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
  }

  const emailInUse = false; 

  if (emailInUse) {
    return res.status(400).json({ message: 'O e-mail fornecido já está em uso.' });
  }

  const sql = 'INSERT INTO cadastro (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário no banco de dados:', err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

    const user = {
      id: result.insertId,
      created_at: new Date(),
      modified_at: new Date()
    };

    res.status(200).json(user);
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
