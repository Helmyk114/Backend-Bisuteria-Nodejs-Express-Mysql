const db = require('../../dataBase/db');
const workerModel = require('../worker/worker.model');

class NotificationModel {
  //Modelo para insertar una notificación a la base de datos
  async createNotification(notificationInfo) {
    try {
      const idCardWorkerAdmin = await workerModel.getWorkerAdmin();
      const admin = idCardWorkerAdmin.map(info => {
        const newNotification = { ...notificationInfo, idCardWorker: info.idCardWorker }
        console.log(newNotification)
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO notification (title, message, idCardWorker) VALUES (?,?,?)';
          db.query(sql, Object.values(newNotification), (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });
      await Promise.all(admin);
    } catch (error) {
      throw error;
    }
  };


}

module.exports = new NotificationModel();