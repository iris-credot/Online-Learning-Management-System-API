const asyncWrapper = require('../middleware/async');
const AssigModel= require('../Model/assignmentModel');
// Controller methods
const AssigController = {
  // Get all contacts
  getAllAssig: asyncWrapper(async (req, res) => {
    const Assig = await AssigModel.find();
      res.json(Assig);
    }),
  // Get a single contact by ID
  getAssig: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const Assig = await AssigModel.findById(id);
      if (!Assig) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      res.json(Assig);
  }),

  // Create a new contact
  createAssig: asyncWrapper(async (req, res) => {
    const newAssig = new AssigModel(req.body);
      const savedAssig = await newAssig.save();
      res.status(201).json(savedAssig);
  }),
  deleteAssig: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const deletedAssig = await AssigModel.findByIdAndDelete(id);
      if (!deletedAssig) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      res.json({ message: 'Assignment deleted successfully' });
  }),
  updateAssig: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const updatedAssig = await AssigModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedAssig) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      res.json(updatedAssig);
    
  })

  
};
module.exports = AssigController;
