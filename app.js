const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv= require('dotenv');
dotenv.config();
const port = process.env.PORT ;
const connection = process.env.MONGODB_URI ;
const errorHandling = require('./middleware/error');
const assert = require('assert');
const swaggerUi=require ( 'swagger-ui-express') ;
const swaggerjson= require ('./dos/swagger.json');
assert.strictEqual(typeof swaggerjson, 'object');

const AllRoutes = require('./routes/index');

const cookieParser = require('cookie-parser');
const  requireAuth = require('./middleware/authentication');

const app = express();
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerjson));
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine
/*const corsOthers={
    origin: [],
    allowedHeaders:["Authorization","Content-Type"],
    methods:["GET","POST","DELETE","PUT"]
   
}*/

/*app.use(corsOther);*/
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

app.use((req, res, next) => {
  if (req.path.startsWith('/api/course/create') || req.path.startsWith('/api/announce/create') || req.path.startsWith('/api/assign/create') || req.path.startsWith('/api/quiz/create') || req.path.startsWith('/api/grade/createGradeQuiz') || req.path.startsWith('/api/grade/createGradeAssig')) {
    console.log('New upload detected:', req.path);
    // Here you can add code to send a notification to users
    if(req.path.startsWith('/course/create')){
      console.log('New Course notification sent:', req.path);
    }
    if(req.path.startsWith('/announce/create')){
      console.log('New Announcement notification sent:', req.path);
    }
    if(req.path.startsWith('/assign/create')){
      console.log('New Assignment notification sent:', req.path);
    }
    if(req.path.startsWith('/quiz/create')){
      console.log('New Quiz notification sent:', req.path);
    }
    if(req.path.startsWith('/grade/createGradeQuiz')){
      console.log('New  Quiz Grades notification sent:', req.path);
    }
    if(req.path.startsWith('/grade/createGradeAssig')){
      console.log('New  Assignment Grades notification sent:', req.path);
    }
    
  }
  next();
});


app.use('/api', AllRoutes);
app.use(errorHandling);