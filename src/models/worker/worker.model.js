const db = require('../../dataBase/db');
const { hashPassword } = require('../../config/bcrypt');

//Clase que controlará todas las peticiones del trabajador
class WorkerModel {
  //Modelo para insertar un nuevo trabajador a la base de datos
  async createWorker(infoWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO worker(idCardWorker, workerName, workerLastName, workerEmail, workerPhone, userName, password, photo, idRole, numberBank, idBank, idState) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, Object.values(infoWorker), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener el perfil un trabajador
  async getProfileWorker(idCardWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT W.idCardWorker, W.workerName, W.workerLastName, W.userName, W.workerEmail, W.workerPhone, W.photo, W.numberBank ,R.roles, B.banks FROM worker W INNER JOIN role R on W.idRole = R.idRole INNER JOIN bank B ON W.idBank = B.idBank WHERE idCardWorker = ?';
      db.query(sql, idCardWorker, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener mostrar la informacion de trabajador
  async getWorker(idCardWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM worker WHERE idCardWorker = ?';
      db.query(sql, idCardWorker, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener a todos los administradores del sistema
  async getWorkerAdmin() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT idCardWorker FROM worker WHERE  idRole = 1';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener a todos los trabajadores según su estado
  async getActivateInactiveWorker(idState) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT W.idCardWorker, W.workerName, W.workerLastName, W.photo, W.workerPhone, R.roles FROM worker W INNER JOIN role R on W.idRole = R.idRole WHERE idState = ?';
      db.query(sql, idState, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para activar o desactivar un trabajador
  async activateInactiveWorker(idCardWorker, idState) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE worker SET idState = ? WHERE idCardWorker = ?';
      db.query(sql, [idState, idCardWorker], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows === 0) {
            reject({ message: `No se encontró ningún trabajador con ID: ${idCardWorker}` });
          } else {
            resolve({ message: `Se ha actualizado el estado del trabajador con ID: ${idCardWorker}` });
          }
        }
      });
    });
  };

  //Modelo para actualizar la informacion de un trabajador
  async updateWorker(idCardWorker, workerData, photo) {
    const { workerName, workerLastName, workerEmail, workerPhone, userName, password, numberBank, idBank } = workerData;
    const hashedPassword = await hashPassword(password);

    const updateSql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, numberBank = ?, idBank = ? WHERE idCardWorker = ?';
    const updateImageSql = 'UPDATE worker SET workerName = ?, workerLastName = ?, workerEmail = ?, workerPhone = ?, userName = ?, password = ?, photo = ?, numberBank = ?, idBank = ? WHERE idCardWorker = ?';

    const sql = photo ? updateImageSql : updateSql;
    const params = photo ? [workerName, workerLastName, workerEmail, workerPhone, userName, hashedPassword, photo, numberBank, idBank, idCardWorker] : [workerName, workerLastName, workerEmail, workerPhone, userName, hashedPassword, numberBank, idBank, idCardWorker];

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = new WorkerModel();