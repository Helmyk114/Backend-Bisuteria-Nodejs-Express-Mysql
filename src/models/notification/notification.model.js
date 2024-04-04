const db = require('../../dataBase/db');
const workerModel = require('../worker/worker.model');

class NotificationModel {
  //Modelo para insertar una notificación de administrador a la base de datos
  async createNotification(notificationInfo) {
    try {
      const idCardWorkerAdmin = await workerModel.getWorkerAdmin();
      const admin = idCardWorkerAdmin.map(info => {
        const newNotification = { ...notificationInfo, idCardWorker: info.idCardWorker }
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

  async createNotificationCraftman(notificationInfo) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO notification (title, message, idCardWorker) VALUES (?,?,?)';
      db.query(sql, Object.values(notificationInfo), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  async createNotificationSeller(notificationInfo) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO notification (title, message, idCardWorker) VALUES (?,?,?)';
      db.query(sql, Object.values(notificationInfo), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo pra obtener las notificationes según el trabajador
  async getNotificationWorker(idCardWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT  idNotification, title, message, DATE_FORMAT(orderDate, "%d/%m/%Y") AS fecha, TIME_FORMAT(orderDate, "%H:%i:%s") AS hora FROM notification WHERE idCardWorker = ? ORDER BY orderDate DESC';
      db.query(sql, idCardWorker, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

}

module.exports = new NotificationModel();