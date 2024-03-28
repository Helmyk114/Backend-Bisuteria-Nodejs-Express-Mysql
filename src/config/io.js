

function initializaSocket(server) {
  const io = new Server(server, {
    cors : {
      origin: '*'
    }
  })
  io.on('conectado', () => {
    console.log('alguien se conecto')
  })
};

module.exports = initializaSocket;