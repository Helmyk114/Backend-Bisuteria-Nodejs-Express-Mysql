const { createNotification, createNotificationCraftman } = require("../../controllers/notification/notification.controller");

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
    createNotification(message);
  } else {
    console.error('IO instance not initialized!');
  }
};

exports.listWork = (message) => {
  if (ioInstance) {
    if (message.idCardWorker) {
      ioInstance.emit('payList:Server', message)
      createNotificationCraftman(message);
    } else {
      ioInstance.emit('listWork:Server', message);
      createNotification(message);
    }
  } else {
    console.error('IO instance not initialized!');
  }
}