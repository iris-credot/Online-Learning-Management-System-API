const asyncWrapper = require('../middleware/async');
const DisModel= require('../Model/discussionModel');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
// Controller methods
const DisController = {
  // Get all contacts
  getAllDiss: asyncWrapper(async (req, res,next) => {
    const Dis = await DisModel.find();
      res.json(Dis);
    }),
  // Get a single contact by ID
  getDis: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const Dis = await DisModel.findById(id);
      if (!Dis) {
        return next(new Notfound(`Discussion not found`));
      }
      res.json(Dis);
  }),

  // Create a new contact
  createDis: asyncWrapper(async (req, res,next) => {
    const newDis = new DisModel(req.body);
      const savedDis = await newDis.save();
      res.status(201).json(savedDis);
  }),
  createReply:asyncWrapper( async(req,res,next)=>{
    
      const { content, author } = req.body;
      const { id } = req.params;

      // Find the discussion by ID
      const discussion = await DisModel.findById(id);

      if (!discussion) {
        return next(new Notfound(`Discussion not found`));
      }

      // Add a reply to the discussion
      discussion.replies.push({ content, author });
      await discussion.save();

      res.status(201).json({ message: 'Reply added successfully', discussion });
 
  }),
  deleteDis: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const deletedDis = await DisModel.findByIdAndDelete(id);
      if (!deletedDis) {
        return next(new Notfound(`Discussion not found`));
      }
      res.json({ message: 'Discussion deleted successfully' });
  }),
  updateDis: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const updatedDis = await DisModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedDis) {
        return next(new Notfound(`Discussion not found`));
      }
      res.json(updatedDis);
    
  })

  
};
module.exports = DisController;
