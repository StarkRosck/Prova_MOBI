const express = require('express');
const server =  express();
const filmes = require('./src/data/filmes.json');
const mysql = require('mysql');
// const port = 3000;
server.listen(3000, () =>{
  console.log('Servidor está funcionando ')
});

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




server.get('/views/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT id,created_at,modified_at FROM cadastro WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(200).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

server.listen(server, () => {
  console.log(`API rodando em http://localhost:${server}`);
});



  



