// models/assignment.js

const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String},
    questions: {type: mongoose.Schema.Types.ObjectId, ref: 'QNS'},
    Newfile:{type:String},
    grade:{type:String},
    due_date: { type: Date, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    // Additional fields can be added as needed
},{timestamps:true});

module.exports = mongoose.model('Assignment', assignmentSchema);
