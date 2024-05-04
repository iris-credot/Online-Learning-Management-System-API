const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv= require('dotenv');
dotenv.config();
const port = process.env.PORT ;
const connection = process.env.MONGODB_URI ;
const assert = require('assert');
const swaggerUi=require ( 'swagger-ui-express') ;
const swaggerjson= require ('./dos/swagger.json');
assert.strictEqual(typeof swaggerjson, 'object');

const AllRoutes = require('./routes/index');

const cookieParser = require('cookie-parser');
const  requireAuth = require('./middleware/authentication');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerjson));
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine

// 'mongodb+srv://tetairiscredot:Niwenshuti250@cluster0.iu5ca8f.mongodb.net/Authentication-Project?retryWrites=true&w=majority&appName=Cluster0' ||
// database connection


  mongoose.connect(connection)
  .then(() => {
      app.listen(port, () =>{
          console.log("Mongo DB connected....")
          console.log(`Server running on ${port}...`);
      })
  })
  .catch((err) => console.log(err));
// routes
// app.get('*', checkUser);


app.use('/', AllRoutes);

