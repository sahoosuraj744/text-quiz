import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },

        technology: {
            type: String,
            required: true,
        },

        level: {
            type: String,
            enum: ["Basic", "Intermediate", "Advanced"],
            required: true,
        },

        totalQuestions: {
            type: Number,
            required: true,
        },

        correct: {
            type: Number,
            default: 0,
        },

        wrong: {
            type: Number,
            default: 0,
        },

        score: {
            type: Number,
            default: 0,
        },

        percentage: {
            type: Number,
            default: 0,
        },

        timeTaken: {
            type: Number, // seconds
            required: true,
        },

        submittedAnswers: [
            {
                question: String,
                selectedAnswer: String,
                correctAnswer: String,
                isCorrect: Boolean,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Result= mongoose.model("Result", resultSchema);
export default Result;