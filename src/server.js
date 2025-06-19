// src/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos (cliente)
app.use(express.static('public'));

// Teste de conexão via Socket.IO
io.on('connection', (socket) => {
  console.log('Novo jogador conectado:', socket.id);

  // Evento de exemplo
  socket.on('move', (data) => {
    console.log('Movimentação recebida:', data);
    // Aqui você pode adicionar regras de jogo, atualizar estados, etc.
  });

  socket.on('disconnect', () => {
    console.log('Jogador desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
