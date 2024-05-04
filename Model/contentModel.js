// models/content.js

const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    type: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    file:  [ { type: String} ],
    order: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},{timestamps:true});

module.exports = mongoose.model('Content', contentSchema);
