const db = require('../../dataBase/db');

class ListworkModel {
  //Modelo para crear una lista de trabajo
  async createListwork(listworkInfo) {
    return new Promise((resolve, reject) => {
      const { idWorkList, listName, total, idCardWorker, idState, details } = listworkInfo;
      // console.log('info Front:',listworkInfo)
      const sql = 'INSERT INTO workList (idWorkList, listName, total ,idCardWorker, idState ) VALUES (?,?,?,?,?)';
      db.query(sql, [idWorkList, listName, total, idCardWorker, idState], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          const getIdQuery = 'SELECT idWorkList FROM workList WHERE idCardWorker = ? AND listName = ? ORDER BY creationDate DESC LIMIT 1';
          db.query(getIdQuery, [idCardWorker, listName], (err, row) => {
            if (err) {
              reject(err);
            } else {
              if (row === 0) {
                reject(new Error('No se encontró ninguna lista que coincida con los criterios especificados.'));
                return;
              }
              const listWorkId = row[0].idWorkList;
              console.log(listWorkId)
              //Filtrar el array de details para incluir en la lista de trabajo solo los productos que tienen una cantidad mayor o igual a 1
              const filteredDetails = details.filter(detail => parseInt(detail.quantity) > 0);
              //Ingresar los datos filtrados con el ID de la última listWork a la base de datos
              Promise.all(filteredDetails.map(detail => {
                return new Promise((resolve, reject) => {
                  const detailSql = 'INSERT INTO listDetail(quantity, subTotal, idWorkList, idProduct) VALUES (?,?,?,?)';
                  const detailValues = [detail.quantity, detail.subTotal, listWorkId, detail.idProduct];
                  db.query(detailSql, detailValues, (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      const detailOrderListSql = 'INSERT INTO orderList(idOrder, idWorkList) VALUES(?,?)';
                      const detailOrderListValues = [detail.idOrder, listWorkId];
                      db.query(detailOrderListSql, detailOrderListValues, (err, result) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(result);
                          console.log('detalle Ordenlista:',result);
                        }
                      });
                    }
                  })
                });
              })
              );
            }
          });
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
    return new Promise((resolve, reject) => {
      const sql = 'SELECT idOrderDetail, quantity, subTotal, idProduct, idOrder FROM orderdetail ';
      db.query(sql, idOrderDetail, (err, result) => {
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