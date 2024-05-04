const express = require('express');
const Contentrouter= express.Router();



const  ContentController = require('../controllers/contentController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'Contents/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const auth = require('../middleware/authentication');

Contentrouter.get('/all', auth.AuthJWT, ContentController.getAllContent);
Contentrouter.get('/getone/:id', auth.AuthJWT, ContentController.getContent);
Contentrouter.delete('/delete/:id',auth.adminJWT,  ContentController.deleteContent);
Contentrouter.post('/create', upload.array('file'),auth.adminJWT,ContentController.createContent);
Contentrouter.put('/update/:id',auth.adminJWT, ContentController.updateContent);
module.exports = Contentrouter;