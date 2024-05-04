const asyncWrapper = require('../middleware/async');
const DisModel= require('../Model/discussionModel');
// Controller methods
const DisController = {
  // Get all contacts
  getAllDiss: asyncWrapper(async (req, res) => {
    const Dis = await DisModel.find();
      res.json(Dis);
    }),
  // Get a single contact by ID
  getDis: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const Dis = await DisModel.findById(id);
      if (!Dis) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.json(Dis);
  }),

  // Create a new contact
  createDis: asyncWrapper(async (req, res) => {
    const newDis = new DisModel(req.body);
      const savedDis = await newDis.save();
      res.status(201).json(savedDis);
  }),
  createReply: async(req,res)=>{
    try {
      const { content, author } = req.body;
      const { id } = req.params;

      // Find the discussion by ID
      const discussion = await DisModel.findById(id);

      if (!discussion) {
          return res.status(404).json({ message: 'Discussion not found' });
      }

      // Add a reply to the discussion
      discussion.replies.push({ content, author });
      await discussion.save();

      res.status(201).json({ message: 'Reply added successfully', discussion });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
  },
  deleteDis: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const deletedDis = await DisModel.findByIdAndDelete(id);
      if (!deletedDis) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.json({ message: 'Discussion deleted successfully' });
  }),
  updateDis: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const updatedDis = await DisModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedDis) {
        return res.status(404).json({ message: 'Disccusion not found' });
      }
      res.json(updatedDis);
    
  })

  
};
module.exports = DisController;
