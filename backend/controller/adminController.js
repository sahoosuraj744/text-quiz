import Quiz from '../model/Quiz.js'
const LETTERS = ["A", "B", "C", "D"]
export const uploadQuiz = async (req, res) => {
    const { technology, level, timeLimit, questions } = req.body;
    const createdBy = req.auth?.user
    const quiz = await Quiz.findOneAndUpdate(
        {
            technology: technology.toLowerCase(),
            level
        },
        {
            technology,
            level,
            timeLimit,
            questions,
            totalQuestions: questions.length,
            createdBy
        },
        {
            new: true,
            upsert: true
        }
    );
    res.status(200).json({ success: true, quiz });

}
//to get all quiz stats
export const getAllQuizes = async (req, res) => {
    const quizes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizes);
}
export const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findByIdAndDelete(id);
        if (!quiz) {
            res.status(404).json({ success: false, message: "Quiz found" })
        }
        res.json({ success: true, message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Delete quiz  error", error);
        res.status(500).json({ message: "Server Error" })

    }
}
export const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.answerKey) {
                score += 2;          // Correct answer
            } else {
                score -= 0.5;        // Wrong answer
                // Use score += 0.5 instead if your rules award 0.5 marks for wrong answers.
            }
        });

        res.status(200).json({
            success: true,
            score,
            totalMarks: quiz.questions.length * 2
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};