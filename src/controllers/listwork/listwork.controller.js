const ListworkModel = require('../../models/listwork/listwork.model');
const ids = require('../../config/ids');

//Controlador para crear un lista de trabajo
async function createListwork(req, res) {
  try {
    const { listName, total, idCardWorker, idState } = req.body;
    const table = 'workList';
    const condicion = 'idWorkList';

    ids(table, condicion, async (idWorkList, err) => {
      if (err) {
        console.log({ data: `error id: ${err}` });
        return res.status(500).json({ error: 'Internal Server Error (createListwork1)' });
      };
      const listworkInfo = {
        idWorkList: idWorkList,
        listName: listName,
        total: total,
        idCardWorker: idCardWorker,
        idState: idState
      };
      try {
        const result = await ListworkModel.createListwork(listworkInfo);
        res.json({ data: result });
      } catch (error) {
        console.log({ data: `Internal Server Error (createListwork2): ${error}` });
      }
    });
  } catch (error) {
    console.log({ data: `Internal Server Error (createListwork3): ${error}` });
    res.status(500).json({ error: 'Internal Server Error (createListwork3)' });
  };
};

//Controlador para obtener las listas de trabajo según su estado
async function getListworkStatus(req, res) {
  try {
    const { idState } = req.params;
    const result = await ListworkModel.getListworkStatus(idState);
    res.json({ data: result});
  } catch (error) {
    console.log({ data: `Internal Server Error (getListworkStatus): ${error}` });
    res.status(500).json({ error: 'Internal Server Error (getListworkStatus)' });
  }
};

//Controlador para obtener las lsitas de trabajo según su estado y el id del trabajador
async function getListworkStatusIdCardWorker(req, res) {
  try {
    const { idState, idCardWorker } = req.params;
    const result = await ListworkModel.getListworkStatusIdCardWorker(idState, idCardWorker);
    res.json({ data: result });
  } catch (error) {
    console.log({ data: `Internal Server Error (getListworkStatusIdCardWorker): ${error}` });
    res.status(500).json({ error: 'Internal Server Error (getListworkStatusIdCardWorker)' });
  }
};

async function getListwork(req, res) {
  try {
    const { idWorkList } = req.params;
    const listworkInfo = await ListworkModel.getListwork(idWorkList);
    if (infoClient.length < 1) {
      res.json()
    } else {
      res.json({ data: listworkInfo });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports = {
  createListwork,
  getListworkStatus,
  getListworkStatusIdCardWorker,
  getListwork
}