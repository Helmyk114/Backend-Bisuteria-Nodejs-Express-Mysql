const db = require("../../dataBase/db");
const { updateStateOrderAllWorList } = require("../orders/order.model");

class OrderList {
  //Modelo para obtener el idOrder según el idWorkList
  async idOrder(idWorkList) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT idOrder FROM orderList WHERE idWorkList = ?'
      db.query(sql, idWorkList, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

    //Modelo para obtener todas las listas de trabajo asociado a una orden
    async orderList(idOrders) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT O.idOrder, WL.idWorkList, WL.idState From orders O inner join orderList OL on O.idOrder = OL.idOrder inner join workList WL on OL.idWorkList = WL.idWorkList WHERE O.idOrder = ?';
        const sqlValues = idOrders.map(idOrder => idOrder.idOrder);
        db.query(sql, sqlValues, async (err, results) => {
          if (err) {
            reject(err);
          } else {
            const state = results.every(result => result.idState === 3);
            if (state) {
              try {
                await updateStateOrderAllWorList(idOrders, '3');
                console.log('Estado de la orden actualizado correctamente');
              } catch (error) {
                reject(error);
                console.log('Error al actualizar el estado de la orden:', error);
              }
            }
            resolve(results);
          }
        });
      });
    };

}

module.exports = new OrderList();