const asyncWrapper = require('../middleware/async');
const AssigModel= require('../Model/assignmentModel');
const cloudinary =require('cloudinary');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
// Controller methods
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const AssigController = {
  // Get all contacts
  getAllAssig: asyncWrapper(async (req, res,next) => {
    const Assig = await AssigModel.find();
      res.json(Assig);
    }),
  // Get a single contact by ID
  getAssig: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const Assig = await AssigModel.findById(id);
      if (!Assig) {
        return next(new Notfound(`Assignment not found`));
      }
      res.json(Assig);
  }),

  // Create a new contact
  createAssig: asyncWrapper(async (req, res,next) => {
    const { userId,course, grade, title, description,due_date} = req.body;
      const dateNow = Date.now();
      const fileName = `${title}_file_${dateNow}`;
      
      
      
          
        const uploadedFiles = [];

        for (let i = 0; i < req.files.length; i++) {
          const fileoutname = req.files[i].path
          const fileType = getFileType(fileoutname);
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.files[i].path, { folder: `LMS/${fileType}`, public_id: fileName });
            uploadedFiles.push(cloudinaryResponse.secure_url);
        }

        const newAssign = new AssigModel({
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
  
    await newAssign.save();
  
    res.status(201).json({ASSIGNMENT:newAssign});
 
  }),
  deleteAssig: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const deletedAssig = await AssigModel.findByIdAndDelete(id);
      if (!deletedAssig) {
        return next(new Notfound(`Assignment not found`));
      }
      res.json({ message: 'Assignment deleted successfully' });
  }),
  updateAssig: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const updatedAssig = await AssigModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedAssig) {
        return next(new Notfound(`Assignment not found`));
      }
      res.json(updatedAssig);
    
  })

  
};
module.exports = AssigController;
