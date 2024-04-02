const { Server } = require('socket.io')
const http = require('http');
const { app } = require('../../app');

function initServer(app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

    // Manejar conexiones de sockets entrantes
    io.on('connection', (socket) => {
      console.log('Un cliente se ha conectado');
  
      // Manejar desconexiones de sockets
      socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
      });
    });

 
    return { server, io }; // Retornar tanto el servidor como el objeto 'io'
  };
  
  const { server, io } = initServer(app); // Desestructurar el objeto devuelto
  
  module.exports = { server, io };