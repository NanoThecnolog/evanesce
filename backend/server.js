// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

let messages = [];

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Envia as mensagens atuais para o novo cliente
    socket.emit('loadMessages', messages);

    // Recebe nova mensagem do cliente
    socket.on('sendMessage', (message) => {
        messages.push(message);
        io.emit('newMessage', message); // Emite para todos os clientes
    });

    // Limpa mensagem após lida
    socket.on('readMessage', (messageId) => {
        messages = messages.filter((msg) => msg.id !== messageId);
        io.emit('messageDeleted', messageId); // Notifica todos os clientes da deleção
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});
