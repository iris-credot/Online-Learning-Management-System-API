const express = require('express');
const Userrouter= express.Router();

const auth = require('../middleware/authentication');
const authController = require('../controllers/UserController');


Userrouter.post('/signup', authController.signup_post);
Userrouter.post('/login', authController.login_post);
Userrouter.post('/forgot', authController.ForgotPassword);
Userrouter.post('/resetpassword', authController.ResetPassword);
Userrouter.get('/all' ,auth.adminJWT,authController.getAllusers);
Userrouter.get('/allone/:id', auth.adminJWT,authController.getuserbyId);
Userrouter.get('/findByname', auth.adminJWT,authController.getuserbyname);
Userrouter.get('/findByRole',auth.adminJWT, authController.getuserbyrole);
Userrouter.delete('/allone/:id',auth.adminJWT, authController.deleteUser);
Userrouter.put('/allone/:id', auth.AuthJWT,authController.updateUser);
Userrouter.post('/verifyotp', authController.OTP);
module.exports = Userrouter;