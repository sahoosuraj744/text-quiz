import express from 'express'
import { getStats } from '../controller/userController.js'
import { deleteQuiz, getAllQuizes, submitQuiz, uploadQuiz } from '../controller/adminController.js'
import { isAdmin, protect } from '../middleware/auth.js'
const router = express.Router()
router.post("/upload-quiz", protect, isAdmin, uploadQuiz)
router.post("/submit-quiz", submitQuiz)
router.get("/stats", getStats)
router.get("/quizes", getAllQuizes);
router.delete("/quiz/:id", protect, isAdmin, deleteQuiz);
export default router;
