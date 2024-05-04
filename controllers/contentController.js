const asyncWrapper = require('../middleware/async');
const ContentModel= require('../Model/contentModel');
const cloudinary =require('cloudinary');
const path = require('path')

// const cloudinary = require('../cloudinary');
 
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const ContentController = {
  // Get all contacts
  
  getAllContent: asyncWrapper(async (req, res) => {
    const Content = await ContentModel.find({});
      res.json(Content);
    }),
  // Get a single contact by ID
  getContent: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const Content = await ContentModel.findById(id);
      if (!Content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json(Content);
  }),

  
  createContent: async (req, res,next) => {
    try {
      const { userId,course_id, type, title, description, order, ...otherFields} = req.body;
      const dateNow = Date.now();
      const fileName = `${title}_file_${dateNow}`;
      
      
      
          
        const uploadedFiles = [];

        for (let i = 0; i < req.files.length; i++) {
          const fileoutname = req.files[i].path
          const fileType = getFileType(fileoutname);
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.files[i].path, { folder: `LMS/${fileType}`, public_id: fileName });
            uploadedFiles.push(cloudinaryResponse.secure_url);
        }

        const newContent = new ContentModel({
            userId,
            course_id,
            type,
            title,
            description,
            file: uploadedFiles,
            order
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
  
    await newContent.save();
  
    res.status(201).json({Content:newContent});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  deleteContent: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const deletedContent = await ContentModel.findByIdAndDelete(id);
      if (!deletedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json({ message: 'Content deleted successfully' });
  }),
  updateContent: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const updatedContent = await ContentModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json(updatedContent);
    
  })

  
};
module.exports = ContentController;
