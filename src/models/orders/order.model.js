const db = require("../../dataBase/db");

class OrderModel {
  //Modelo para crear una orden nueva, la ordencliente, y la ordenDetalle en la base de datos
  async createOrder(infoOrder) {
    return new Promise((resolve, reject) => {
      const { idOrder, idCardWorker, total, idState, quantityProducts, idCardClient, details } = infoOrder;
      const sql = 'INSERT INTO orders(idOrder, idCardWorker, total, quantityProducts, idState) VALUES (?,?,?,?,?)';
      db.query(sql, [idOrder, idCardWorker, total, quantityProducts, idState], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Obtener el ID de la última orden insertada
          const getIdQuery = 'SELECT idOrder FROM orders WHERE idCardWorker = ? AND total = ? AND idState = ? ORDER BY orderDate DESC LIMIT 1';
          db.query(getIdQuery, [idCardWorker, total, idState], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              if (rows.length === 0) {
                reject(new Error('No se encontró ninguna orden que coincida con los criterios especificados.'));
                return;
              }
              const orderId = rows[0].idOrder;
              // Insertar en la tabla orderClient con el ID de la última orden
              const detailSql = 'INSERT INTO orderClient(idOrder, idCardClient) VALUES (?,?)';
              const detailValues = [orderId, idCardClient];
              db.query(detailSql, detailValues, (err, detailResult) => {
                if (err) {
                  reject(err);
                } else {
                  const detailOrderSql = 'INSERT INTO orderDetail(quantity, subTotal, maxQuantity, idProduct, idOrder) VALUES ?';
                  const detailOrderValues = details.map(detail => [detail.quantity, detail.subTotal, detail.maxQuantity, detail.idProduct,orderId]);
                  db.query(detailOrderSql, [detailOrderValues], (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  };

  //Modelo para obtener los pedidos según su estado
  async getOrderState(idState) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT C.clientname, DATE_FORMAT(O.orderDate, "%Y-%m-%d") AS Date, O.idOrder, O.quantityProducts FROM orders O inner join orderClient OC on O.idOrder=OC.idOrder join client C on OC.idCardClient=C.idCardClient WHERE idState = ?';
      db.query(sql, idState, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener los pedidos según el estado y el id del vendedor
  async getOrderStateIdCard(idState, idCardWorker) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT C.clientname, DATE_FORMAT(O.orderDate, "%Y-%m-%d") AS Date, O.idOrder, O.quantityProducts FROM orders O inner join orderClient OC on O.idOrder=OC.idOrder join client C on OC.idCardClient=C.idCardClient WHERE idState = ? AND idCardWorker = ?';
      db.query(sql, [idState,idCardWorker], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para obtener el detalle de una orden según su id
  async getOrderId(idOrder) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT OD.idOrder, P.image, P.nameProduct, OD.quantity FROM orderDetail OD inner join products P on OD.idProduct=P.idProduct WHERE idOrder = ?';
      db.query(sql, idOrder, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  //Modelo para cambiar el estado de una order
  async cancelOrder(idOrder, idState) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE orders SET idState = ? WHERE idOrder = ?';
      db.query(sql, [idState, idOrder], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows === 0) {
            reject({ message: `No se encontró ningún producto con ID: ${idOrder}` });
          } else {
            resolve({ message: `Se ha actualizado el estado del producto con ID: ${idOrder}` });
          }
        }
      });
    });
  };

}

module.exports = new OrderModel();