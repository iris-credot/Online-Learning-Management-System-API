const express = require('express');
const Disrouter= express.Router();

const  DisController = require('../controllers/discController');
const auth = require('../middleware/authentication');
const badWordFilterMiddleware = require('../middleware/inappropriateContent');


Disrouter.get('/all',auth.AuthJWT,  DisController.getAllDiss);
Disrouter.get('/getOne/:id', auth.AuthJWT, DisController.getDis);
Disrouter.delete('/delete/:id',auth.AuthJWT,  DisController.deleteDis);
Disrouter.post('/create',badWordFilterMiddleware,auth.AuthJWT, DisController.createDis);
Disrouter.post('/createReply/:id',badWordFilterMiddleware,auth.AuthJWT, DisController.createReply);
Disrouter.put('/put/:id',auth.AuthJWT, DisController.updateDis);
module.exports = Disrouter;