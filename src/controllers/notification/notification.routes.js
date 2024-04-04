const express = require('express');
const { getNotificationWorker } = require('./notification.controller');
const router = express.Router();

router
      //Ruta para obtener las notificaticiones según el trabajador
      .get('/notificacion/:idCardWorker', getNotificationWorker)

module.exports = router;