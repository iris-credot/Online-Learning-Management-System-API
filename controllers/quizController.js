const asyncWrapper = require('../middleware/async');
const QuizModel= require('../Model/quizModel');
const cloudinary =require('cloudinary');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
// Controller methods
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const QuizController = {
  // Get all contacts
  getAllQuiz: asyncWrapper(async (req, res,next) => {
    const Quiz = await QuizModel.find();
      res.json(Quiz);
    }),
  // Get a single contact by ID
  getQuiz: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const Quiz = await QuizModel.findById(id);
      if (!Quiz) {
        return next(new Notfound(`Quiz not found`));
      }
      res.json(Quiz);
  }),

  // Create a new contact
  createQuiz: asyncWrapper(async (req, res,next) => {
    const { userId,course, grade, title, description,due_date,file} = req.body;
      const dateNow = Date.now();
      const fileName = `${title}_file_${dateNow}`;
      
      
      
          
        const uploadedFiles = [];

        for (let i = 0; i < req.files.length; i++) {
          const fileoutname = req.files[i].path
          const fileType = getFileType(fileoutname);
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.files[i].path, { folder: `LMS/${fileType}`, public_id: fileName });
            uploadedFiles.push(cloudinaryResponse.secure_url);
        }

        const newQuiz = new QuizModel({
            userId,
            course,
            grade,
            due_date,
            title,
            description,
            file: uploadedFiles,
          
        });

    
    function getFileType(fileoutname) {
      
      const extension = fileoutname.split('.').pop()?.toLowerCase() || '';
  
      if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
          return 'images';
      } else if (['pdf'].includes(extension)) {
          return 'pdfs';
      } else if (['mp4', 'avi', 'mov'].includes(extension)) {
          return 'videos';
      } else {
          return 'other';
      }
  }
  
    await newQuiz.save();
  
    res.status(201).json({Quiz:newQuiz});
  }),
  deleteQuiz: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const deletedQuiz = await QuizModel.findByIdAndDelete(id);
      if (!deletedQuiz) {
        return next(new Notfound(`Quiz not found`));
      }
      res.json({ message: 'Quiz deleted successfully' });
  }),
  updateQuiz: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const updatedQuiz = await QuizModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedQuiz) {
        return next(new Notfound(`Quiz not found`));
      }
      res.json(updatedQuiz);
    
  })

  
};
module.exports = QuizController;
