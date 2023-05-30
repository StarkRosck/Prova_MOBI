const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'entrega' 
  });
  

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados: ', err);
      return;
    }
    console.log('Conexão estabelecida com sucesso!');
  });


const app = express();
app.use(bodyParser.json());


connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conexão ao banco de dados estabelecida com sucesso');
    }
  });
  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = `SELECT id FROM cadastro WHERE email = ? AND senha = ?`;
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (results.length === 1) {
          const userId = results[0].id;
  
          const token = jwt.sign({ email, id: userId }, 'chave-secreta-do-jwt');
  
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }
      }
    });
  });
  
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });