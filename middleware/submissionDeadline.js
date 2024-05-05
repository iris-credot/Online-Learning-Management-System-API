const QuizModel= require('../Model/quizModel');
const AssigModel= require('../Model/assignmentModel');
const submissionDeadlineMiddleware = async(req, res, next) => {
    try {
        const { quiz,assignment } = req.body; // Assuming the quiz ID is sent in the request body
       
        // Fetch the quiz by ID
        const quizz =quiz ?  await  QuizModel.findById(quiz):null ;
        const assignmentt = assignment ? await AssigModel.findById(assignment):null ;
        console.log('Quizz:', quizz);
        console.log('Assignment:', assignmentt);
        if (!quizz && !assignmentt ) {
            return res.status(404).json({ message: 'Quiz or assignment not found ' });
        }
       
        const currentDateTime = new Date();

        // Check if the current date is past the deadline date
        if ((quizz && currentDateTime > quizz.due_date) || (assignmentt && currentDateTime > assignmentt.due_date)) {
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