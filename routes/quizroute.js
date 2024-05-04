const express = require('express');
const Quizrouter= express.Router();

const  QuizController = require('../controllers/quizController');
const auth = require('../middleware/authentication');

Quizrouter.post('/create', auth.adminJWT, QuizController.createQuiz);
Quizrouter.get('/all', auth.AuthJWT, QuizController.getAllQuiz);
Quizrouter.get('/getOne/:id', auth.AuthJWT, QuizController.getQuiz);
Quizrouter.delete('/delete/:id',  auth.adminJWT,QuizController.deleteQuiz);
Quizrouter.put('/put/:id',  auth.adminJWT,QuizController.updateQuiz);

module.exports = Quizrouter;