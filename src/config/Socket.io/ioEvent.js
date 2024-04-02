let ioInstance;

exports.initializeIO = (io) => {
  ioInstance = io;
};

exports.loginIn = (message) => {
  if(ioInstance) {
    ioInstance.emit('login:Server', message);
  } else {
    console.error('IO instance not initialized!');
  }
};

exports.orders = (message) => {
  if(ioInstance) {
    ioInstance.emit('order:Server', message);
  } else {
    console.error('IO instance not initialized!');
  }
};