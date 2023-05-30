const express = require('express');
const server =  express();
const mysql = require('mysql');
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

