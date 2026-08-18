import express from 'express'
import { getStats } from '../controller/userController.js'
import { deleteQuiz, getAllQuizzes, uploadQuiz } from '../controller/adminController.js'
import { isAdmin, protect } from '../middleware/auth.js'
const router = express.Router()
router.post("/upload-quiz", protect, isAdmin, uploadQuiz)

router.get("/stats", getStats)
router.get("/quizzes", getAllQuizzes);
router.delete("/quiz/:id", protect, isAdmin, deleteQuiz);
export default router;
