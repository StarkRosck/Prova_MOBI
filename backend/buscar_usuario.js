const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const db = require('./db.js');

app.get('/buscar_usuario', (req, res) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token inválido ou não fornecido' });
  }

  const authToken = token.split('Bearer ')[1];

  if (authToken !== '123456789') {
    return res.status(401).json({ message: 'Token inválido' });
  }


  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados: ', err);
      return;
    }
    console.log('Conexão estabelecida com sucesso!');
  });




  app.get('/agora/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT email,id,number,created_at,modified_at FROM cadastro WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(200).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  });

  app.listen(app, () => {
    console.log(`API rodando em http://localhost:${app}`);
  });


});



app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
