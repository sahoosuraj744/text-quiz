import express from 'express'
import { CreatemyResult, getMyResult } from '../controller/resultController.js'
const router = express.Router();
router.post("/save-result", CreatemyResult)
router.get("/my-result", getMyResult)
export default router