const express = require('express');
const Announcerouter= express.Router();
const badwordsMiddleware= require('../middleware/inappropriateContent')
const  AnnounceController = require('../controllers/announcController');

const auth = require('../middleware/authentication');

Announcerouter.get('/all', auth.AuthJWT, AnnounceController.getAllAnnou);
Announcerouter.get('/getOne/:id', auth.AuthJWT, AnnounceController.getAnnou);
Announcerouter.delete('/delete/:id',auth.adminJWT,  AnnounceController.deleteAnnou);
Announcerouter.post('/create',badwordsMiddleware,auth.adminJWT, AnnounceController.createAnnou);
Announcerouter.put('/put/:id', auth.adminJWT,AnnounceController.updateAnnou);

module.exports = Announcerouter;