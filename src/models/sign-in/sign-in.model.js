const db = require("../../dataBase/db");

class Sign_inModel {
  //Modelo para iniciar sesion
  async login(userName) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM worker WHERE userName = ?';
      db.query(sql, userName, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  };

  //Modelo para obtener la información de bienvenidad según el id del empleado
  async welcomeInfo(idCardWorker) {
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
}

module.exports = new Sign_inModel();