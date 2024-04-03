const NotificationModel = require("../../models/notification/notification.model");

//Controlador para insertar una notificación de administrador a la base de datos
async function createNotification(message) {
  try {
    const result = await NotificationModel.createNotification(message);
    return { data: result };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Controlador para insertar una notificación de artesano a la base de datos
async function createNotificationCraftman(message) {
  try {
    const result = await NotificationModel.createNotificationCraftman(message);
    return { data: result };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Controlador para insertar una notificación de vendedor a la base de datos
async function createNotificationSeller(message) {
  try {
    const result = await NotificationModel.createNotificationSeller(message);
    return { data: result };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  createNotification,
  createNotificationCraftman,
  createNotificationSeller
}