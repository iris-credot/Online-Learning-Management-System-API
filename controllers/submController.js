const asyncWrapper = require('../middleware/async');
const subModel= require('../Model/submissionModel');
// Controller methods
const cloudinary =require('cloudinary');
const path = require('path')

// const cloudinary = require('../cloudinary');
 
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const SubmController = {
  // Get all contacts
  getAllSubs: asyncWrapper(async (req, res) => {
    const Subs = await subModel.find();
      res.json(Subs);
    }),
  // Get a single contact by ID
  getSub: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const Sub = await subModel.findById(id);
      if (!Sub) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      res.json(Sub);
  }),

  // Create a new contact
  createSub: asyncWrapper(async (req, res) => {
    // const newSub = new subModel(req.body);
    //   const savedSub = await newSub.save();
    //   res.status(201).json({submission:savedSub, message:"Submission successfully sent"});
    try {
      const { userId,course, quiz, assignment,title,url,grade, ...otherFields} = req.body;
      const dateNow = Date.now();
      const fileName = `${title}_file_${dateNow}`;
      
      
      
          
        

        
          const fileoutname = req.file.path
          const fileType = getFileType(fileoutname);
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(fileoutname, { folder: `Submission/${fileType}`, public_id: fileName });
            
        

        const newSub = new subModel({
            userId,
            course,
            quiz,
            assignment,
            title,
            content: cloudinaryResponse.secure_url,
            url,
            grade,
            ...otherFields
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
  
    await newSub.save();
  
    res.status(201).json({Submission:newSub});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
  deleteSub: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const deletedSub = await subModel.findByIdAndDelete(id);
      if (!deletedSub) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      res.json({ message: 'Submission deleted successfully' });
  }),
  updateSub: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const updatedSub = await SubModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedSub) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      res.json(updatedSub);
    
  })

  
};
module.exports = SubmController;
