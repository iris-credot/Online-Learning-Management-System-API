const QuizModel= require('../Model/quizModel');
const AssigModel= require('../Model/assignmentModel');
const submissionDeadlineMiddleware = async(req, res, next) => {
    try {
        const { quiz } = req.body; // Assuming the quiz ID is sent in the request body
        const { assignment } = req.body; 
        // Fetch the quiz by ID
        const quizz = await QuizModel.findById(quiz);
        const assignmentt = await AssigModel.findById(assignment);
        if (!quiz && !assignmentt ) {
            return res.status(404).json({ message: 'Quiz or assignment not found ' });
        }
       
        const currentDateTime = new Date();

        // Check if the current date is past the deadline date
        if (currentDateTime > quizz.due_date) {
            return res.status(400).json({ message: 'Submission deadline for this quiz has passed.' });
        }

        // If the current date is before the deadline date, proceed with the route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports=submissionDeadlineMiddleware;