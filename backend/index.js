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

  const dados = { nome: 'Arthur', email: 'arthur@gmail.com', password:'sdsxcssd123',number:11993091463,area_code:55};

connection.query('INSERT INTO cadastro SET ?', dados, (err, results) => {
  if (err) {
    console.error('Erro ao inserir dados: ', err);
    return;
  }
  console.log('Dados inseridos com sucesso!');
  
  
});




connection.end((err) => {
    if (err) {
      console.error('Erro ao encerrar a conexão: ', err);
      return;
    }
    console.log('Conexão encerrada com sucesso!');
  });
  



