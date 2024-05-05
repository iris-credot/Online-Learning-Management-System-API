const express = require('express');
const Quizrouter= express.Router();
const multer = require('multer');
const  QuizController = require('../controllers/quizController');
const storage = multer.diskStorage({
    destination: 'Uploads/Quiz/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const auth = require('../middleware/authentication');

Quizrouter.post('/create', upload.array('file'), auth.adminJWT, QuizController.createQuiz);
Quizrouter.get('/all', auth.AuthJWT, QuizController.getAllQuiz);
Quizrouter.get('/getOne/:id', auth.AuthJWT, QuizController.getQuiz);
Quizrouter.delete('/delete/:id',  auth.adminJWT,QuizController.deleteQuiz);
Quizrouter.put('/put/:id',  auth.adminJWT,QuizController.updateQuiz);

module.exports = Quizrouter;