const express = require('express');
const Graderouter= express.Router();

const  GradeController = require('../controllers/gradeController');
const auth = require('../middleware/authentication');

Graderouter.get('/all',auth.AuthJWT,GradeController.getAllgrade);
Graderouter.get('/getOne/:id',  auth.AuthJWT,GradeController.getgrade);
Graderouter.delete('/delete/:id',  auth.adminJWT,GradeController.deletegrade);
Graderouter.post('/createGradeAssig',auth.adminJWT, GradeController.createGradeAssign);
Graderouter.post('/createGradeQuiz',auth.adminJWT, GradeController.createGradeQuiz);
Graderouter.put('/put/:id',auth.adminJWT, GradeController.updategrade);
module.exports = Graderouter;