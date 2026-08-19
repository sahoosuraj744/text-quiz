import Result from '../model/Result.js'
import { getAuth } from '@clerk/express'

//create a result
export const CreatemyResult = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false, error: "Unauthorized" })
        }
        const result = await Result.create({
            ...req.body, userId
        })
        res.json(result)
    } catch (error) {
        console.log("CREATE RESULT ERROR", error);
        res.status(500).json({ success: false, message: "Failed" })
    }
}
//to get result
export const getMyResult = async (req, res) => {
    const { userId } = getAuth(req)
    const results=await Result.find({userId}).sort({createdAt:-1})
    res.json(results)
}
