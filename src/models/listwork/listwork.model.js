const db = require('../../dataBase/db');

class ListworkModel {
  //Modelo para crear una lista de trabajo
  async createListwork(listworkInfo) {
    console.log(listworkInfo)
    return new Promise((resolve, reject) => {
      const { idWorkList, listName, total, idCardWorker, idState } = listworkInfo;
      const sql = 'INSERT INTO workList (idWorkList, listName, total ,idCardWorker, idState ) VALUES (?,?,?,?,?)';
      db.query(sql, [idWorkList, listName, total, idCardWorker, idState], (err, result) => {
        if(err){
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener las listas de trabajo según su estado
  async getListworkStatus(idStatus) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT WL.idWorkList, WL.listName, WL.total, W.workerName, W.workerLastName FROM workList WL inner join worker W on WL.idCardWorker = W.idCardWorker WHERE WL.idState = ?';
      db.query(sql, idStatus, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener las lsitas de trabajo según su estado y el id del trabajador
  async getListworkStatusIdCardWorker(idStatus, idCardWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT WL.idWorkList, WL.listName FROM workList WL inner join worker W on WL.idCardWorker = W.idCardWorker WHERE WL.idState = ? AND W.idCardWorker = ?';
      db.query(sql, [idStatus, idCardWorker], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  async getListwork(idOrderDetail) {
    return new Promise((resolve, reject) =>{
      const sql = 'SELECT idOrderDetail, quantity, subTotal, idProduct, idOrder FROM orderdetail ';
      db.query(sql,idOrderDetail, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = new ListworkModel();