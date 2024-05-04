// models/announcement.js

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    target_course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    target_all_users: { type: Boolean, default: false },
    date_posted: { type: Date, default: Date.now }
},{timestamps:true});

module.exports = mongoose.model('Announcement', announcementSchema);
