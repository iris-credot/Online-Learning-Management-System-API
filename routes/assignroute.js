const express = require('express');
const Assignrouter= express.Router();

const  AssignController = require('../controllers/assignController');
const auth = require('../middleware/authentication');


Assignrouter.get('/all',auth.AuthJWT,  AssignController.getAllAssig);
Assignrouter.get('/getOne/:id',auth.AuthJWT,  AssignController.getAssig);
Assignrouter.delete('/delete/:id', auth.adminJWT, AssignController.deleteAssig);
Assignrouter.post('/create',auth.adminJWT, AssignController.createAssig);
Assignrouter.put('/put/:id',auth.adminJWT, AssignController.updateAssig);
module.exports = Assignrouter;