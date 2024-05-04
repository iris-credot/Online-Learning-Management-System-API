const express = require('express');
const Courserouter= express.Router();

const  CourseController = require('../controllers/courseController');
const auth = require('../middleware/authentication');

// Subrouter.get('/signup', authController.signup_get);
//Subrouter.post('/signup',  SubController.signup_post);
// Subrouter.get('/login', authController.login_get);
//Subrouter.post('/login',  SubController.login_post);
// Subrouter.get('/logout', authController.logout_get);
Courserouter.get('/all', auth.AuthJWT, CourseController.getAllCourse);
Courserouter.get('/getone/:id', auth.AuthJWT, CourseController.getCourse);
Courserouter.delete('/delete/:id',auth.adminJWT,  CourseController.deleteCourse);
Courserouter.post('/create',auth.adminJWT, CourseController.createCourse);
Courserouter.put('/update/:id',auth.adminJWT, CourseController.updateCourse);
module.exports = Courserouter;