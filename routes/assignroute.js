const express = require('express');
const Assignrouter= express.Router();
const multer = require('multer');
const  AssignController = require('../controllers/assignController');
const notify = require('../middleware/Notify');
const storage = multer.diskStorage({
    destination: 'Uploads/Assignments/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const auth = require('../middleware/authentication');


Assignrouter.get('/all',auth.AuthJWT,  AssignController.getAllAssig);
Assignrouter.get('/getOne/:id',auth.AuthJWT,  AssignController.getAssig);
Assignrouter.delete('/delete/:id', auth.adminJWT, AssignController.deleteAssig);
Assignrouter.post('/create', upload.array('file'),auth.adminJWT, AssignController.createAssig);
Assignrouter.put('/put/:id',auth.adminJWT, AssignController.updateAssig);
module.exports = Assignrouter;