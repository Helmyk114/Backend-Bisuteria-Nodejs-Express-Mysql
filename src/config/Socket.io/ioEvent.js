const { createNotification, createNotificationCraftman, createNotificationSeller } = require("../../controllers/notification/notification.controller");

let ioInstance;

exports.initializeIO = (io) => {
  ioInstance = io;
};

//Función para emitir una notification cuando un usuario inicia sesión
exports.loginIn = (message) => {
  if (ioInstance) {
    ioInstance.emit('login:Server', message);
  } else {
    console.error('IO instance not initialized!');
  }
};

//Función para emitir una notification cuando se crea una orden
exports.orders = (message) => {
  if (ioInstance) {
    ioInstance.emit('order:Server', message);
    createNotification(message);
  } else {
    console.error('IO instance not initialized!');
  }
};

//Funciones para emitir una notification cuando se termina una orden a un administrator
exports.finishOrderAdmin = (message) => {
  if (ioInstance) {
    if (message.idCardWorker) {
      console.log('vendedor: ', message)
      ioInstance.emit('finish-orderSeller:Server', message)
      createNotificationSeller(message);
    } else {
      ioInstance.emit('finish-orderAdmin:Server', message);
      createNotification(message);
    }
  } else {
    console.error('IO instance not initialized!');
  }
};


//Función para emitir una notificación para listas de trabajo
exports.listWork = (message) => {
  if (ioInstance) {
    if (message.idCardWorker) {
      //Notificaión para pagar y crear una lista de trabajo
      ioInstance.emit('create-payList:Server', message)
      createNotificationCraftman(message);
    } else {
      //Notificaión para terminar una lista de trabajo
      ioInstance.emit('finish-listWork:Server', message);
      createNotification(message);
    }
  } else {
    console.error('IO instance not initialized!');
  }
}