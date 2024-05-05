const asyncWrapper = require('../middleware/async');
const AnnouModel= require('../Model/announcementModel');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
// Controller methods
const AnnouController = {
  // Get all contacts
  getAllAnnou: asyncWrapper(async (req, res,next) => {
    const Annou = await AnnouModel.find();
      res.json(Annou);
    }),
  // Get a single contact by ID
  getAnnou: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const Annou = await AnnouModel.findById(id);
      if (!Annou) {
        return next(new Notfound(`Announcement not found`));
      }
      res.json(Annou);
  }),

  // Create a new contact
  createAnnou: asyncWrapper(async (req, res,next) => {
    const newAnnou = new AnnouModel(req.body);
      const savedAnnou = await newAnnou.save();
      res.status(201).json(savedAnnou);
  }),
  deleteAnnou: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const deletedAnnou = await AnnouModel.findByIdAndDelete(id);
      if (!deletedAnnou) {
        return next(new Notfound(`Announcement not found`));
      }
      res.json({ message: 'Announcement deleted successfully' });
  }),
  updateAnnou: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const updatedAnnou = await AnnouModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedAnnou) {
        return next(new Notfound(`Announcement not found`));
      }
      res.json(updatedAnnou);
    
  })

  
};
module.exports = AnnouController;
