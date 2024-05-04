// models/submission.js

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    submission_date: { type: Date, default: Date.now },
    title:{type : String},
    content: { type: String},
    url:{type:String},
    grading_status: { type: Boolean, default: false },
    grade: { type: Number },
    feedback: { type: String }
},{
    timestamps:true
});

module.exports = mongoose.model('Submission', submissionSchema);
