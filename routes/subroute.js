const express = require('express');
const Subrouter= express.Router();

const  SubController = require('../controllers/submController');
const dueDate= require('../middleware/submissionDeadline');  
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'Uploads/Submissions/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const auth = require('../middleware/authentication');

Subrouter.post('/create', upload.single('file'),dueDate,auth.AuthJWT,SubController.createSub);
Subrouter.get('/all',auth.AuthJWT  ,SubController.getAllSubs);
Subrouter.get('/getOne/:id',auth.AuthJWT,  SubController.getSub);
Subrouter.delete('/delete/:id', auth.AuthJWT, SubController.deleteSub);
Subrouter.put('/put/:id', auth.AuthJWT, SubController.updateSub);

module.exports = Subrouter;