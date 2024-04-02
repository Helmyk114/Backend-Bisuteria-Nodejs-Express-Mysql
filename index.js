const { server, io } = require('./src/config/Socket.io/io')
const { app } = require('./src/app');
const { initializeIO } = require('./src/config/Socket.io/ioEvent');

initializeIO(io);

server.listen(app.get('port'), (err) => {
  if (err) {
    console.log(`Error startting the server: ${err}`);
  } else {
    console.log(`🚀The server is started on the port: ${app.get('port')}`);
  }
});