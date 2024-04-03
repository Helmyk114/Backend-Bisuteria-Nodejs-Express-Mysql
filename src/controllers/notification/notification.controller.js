const NotificationModel = require("../../models/notification/notification.model");


async function createNotification(message) {
  try {
    const result = await NotificationModel.createNotification(message);
    return { data: result };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createNotification
}