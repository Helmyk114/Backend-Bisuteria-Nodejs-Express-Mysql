const OrderModel = require('../../models/orders/order.model');
const ids = require('../../config/ids');

//Controlador para crear una orden
async function createOrder(req, res) {
  try {
    const { idCardWorker, total, quantityProducts, idCardClient, details } = req.body;
    const table = 'orders';
    const condicion = 'idOrder';
  
    ids(table, condicion, async (idOrder, err) => {
      if (err) {
        console.log({ data: `error id: ${err}` });
        return res.status(500).json({ error: 'Internal Server Error (createOrder1)' });
      };
      const infoOrder = {
        idOrder: idOrder,
        idCardWorker: idCardWorker,
        total: total,
        quantityProducts: quantityProducts,
        idState: "1",
        idCardClient: idCardClient,
        details: details
      };
      try {
        const result = await OrderModel.createOrder(infoOrder);
        res.json(result)
      } catch (error) {
        console.log({ data: `Internal Server Error (createOrder2): ${error}` });
      }
    });
  } catch (error) {
    console.log({ data: `Internal Server Error2: ${error}` });
		res.status(500).json({ error: 'Internal Server Error (createOrder3)' });
  };
};

//Controlador para obtener todos los pedidos según su estado
async function getOrderState(req,res) {
  try {
    const { idState1, idState2 } = req.params;
    const result = await OrderModel.getOrderState(idState1, idState2);
    res.json({ data: result });
  } catch (err) {
    console.log({ data: `Internal Server Error (getOrderState): ${err}` });
  }
};

//Controlador para obtener una orden segun su estado y el id del trabajador
async function getOrderStateIdCard(req,res) {
  try {
    const { idState, idCardWorker } = req.params;
    const result = await OrderModel.getOrderStateIdCard(idState, idCardWorker);
    res.json({ data: result });
  } catch (err) {
    console.log({ data: `Internal Server Error (getOrderStateId): ${err}` });
  }
};
//Controlador para obtener una orden segun dos estados y el id del trabajador
async function getOrderStatesIdCard(req,res) {
  try {
    const { idState1, idState2, idCardWorker } = req.params;
    const result = await OrderModel.getOrderStatesIdCard(idState1, idState2, idCardWorker);
    res.json({ data: result });
  } catch (err) {
    console.log({ data: `Internal Server Error (getOrderStateId): ${err}` });
  }
};

//Controlador para obtener el detalle de una orden según su id
async function getOrderId(req, res) {
  try {
    const { idOrder } = req.params;
    const result = await OrderModel.getOrderId(idOrder);
    res.json({ data: result})
  } catch (error) {
    console.log({ data: `Internal Server Error (getOrderId): ${error}` });
  }
}

async function cancelOrder(req,res) {
  try {
    const { idOrder, idState } = req.params;
    const result = await OrderModel.cancelOrder(idOrder, idState);
    if (result.affectedRows === 0) {
			res.json({ data: 'Error' });
		} else {
			res.json({ data: result });
		}
  } catch (err) {
    console.log({ data: `Internal Server Error (cancelOrder): ${err}` });
  }
}

module.exports = {
  createOrder,
  getOrderState,
  getOrderStateIdCard,
  getOrderStatesIdCard,
  getOrderId,
  cancelOrder
}