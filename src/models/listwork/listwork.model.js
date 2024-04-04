const db = require('../../dataBase/db');
const { idOrder, orderList } = require('../orderList/orderList.models');
const { maxQuantityUpdate, updateStateOrder, addMaxQuantity } = require('../orders/order.model');

class ListworkModel {
  //Modelo para crear una lista de trabajo
  async createListwork(listworkInfo) {
    return new Promise((resolve, reject) => {
      const { idWorkList, listName, total, idCardWorker, idState, details, maxQuantity } = listworkInfo;

      const sql = 'INSERT INTO workList (idWorkList, listName, total ,idCardWorker, idState ) VALUES (?,?,?,?,?)';
      db.query(sql, [idWorkList, listName, total, idCardWorker, idState], async (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          const getIdQuery = 'SELECT idWorkList FROM workList WHERE idCardWorker = ? AND listName = ? ORDER BY creationDate DESC LIMIT 1';
          db.query(getIdQuery, [idCardWorker, listName], async (err, row) => {
            if (err) {
              reject(err);
            } else {
              if (row === 0) {
                reject(new Error('No se encontró ninguna lista que coincida con los criterios especificados.'));
                return;
              }
              const listWorkId = row[0].idWorkList;
              //Filtrar el array de details para incluir en la lista de trabajo solo los productos que tienen una cantidad mayor o igual a 1
              const filteredDetails = details.filter(detail => parseInt(detail.quantity) > 0);
              //Ingresar los datos filtrados con el ID de la última listWork a la base de datos
              Promise.all(filteredDetails.map(async (detail) => {
                return new Promise((resolve, reject) => {
                  const detailSql = 'INSERT INTO listDetail(quantity, subTotal, idWorkList, idProduct) VALUES (?,?,?,?)';
                  const detailValues = [detail.quantity, detail.subTotal, listWorkId, detail.idProduct];
                  db.query(detailSql, detailValues, (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      const detailOrderListSql = 'INSERT INTO orderList(idOrder, idWorkList) VALUES(?,?)';
                      const detailOrderListValues = [detail.idOrder, listWorkId];
                      db.query(detailOrderListSql, detailOrderListValues, async (err, result) => {
                        if (err) {
                          reject(err);
                        } else {
                          const infoQuantityArray = Object.values(maxQuantity);
                          maxQuantityUpdate(infoQuantityArray);
                          const info = await addMaxQuantity(detail.idOrder);
                          if (info == 0) {
                            updateStateOrder(detail.idOrder, '2');
                          } else {
                            updateStateOrder(detail.idOrder, '7');
                          }
                          resolve(result);
                        }
                      });
                    }
                  })
                });
              }));
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

  //Modelo para obtener las listas de trabajo según su estado y el id del trabajador
  async getListworkStatusIdCardWorker(idStatus, idCardWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT WL.idWorkList, WL.listName, WL.total FROM workList WL inner join worker W on WL.idCardWorker = W.idCardWorker WHERE WL.idState = ? AND W.idCardWorker = ?';
      db.query(sql, [idStatus, idCardWorker], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener el detalle de una lista de trabajo según del id de la lista
  async getDetailListWork(idWorkList) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT  LD.idWorkList, P.image, P.nameProduct, LD.quantity, LD.subTotal, WL.total FROM listDetail LD inner join products P on LD.idProduct = P.idProduct inner join workList WL on LD.idWorkList = WL.idWorkList WHERE LD.idWorkList = ?';
      db.query(sql, idWorkList, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener el nombre de una lista de trabajo segun su id
  async getListworkName(idWorkList) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT  listName FROM workList WHERE idWorkList = ?';
      db.query(sql, idWorkList, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para cambiar el estado de una lista de trabajo
  async updateStateWorkList(idWorkList, idState) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE workList SET idstate = ? WHERE idWorkList = ?';
      const sqlValues = [idState, idWorkList];
      db.query(sql, sqlValues, async (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows === 0) {
            reject({ message: `No se encontró ninguna lista con ID: ${idWorkList}` });
          } else {
            const idOrders = await idOrder(idWorkList);
            await orderList(idOrders);
            resolve({ message: `Se ha actualizado el estado de la lista con ID: ${idWorkList}` });
          }
        }
      });
    });
  };

  //Modelo para obtener el idCardWorker con el idWorkList
  async getidCardWorkerListWork(idWorkList) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT  idCardWorker FROM workList WHERE idWorkList = ?';
      db.query(sql, idWorkList, (err, result) => {
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