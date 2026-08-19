import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { connectDb } from './config/db.js'
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import resultRoutes from './routes/result.js'
const app = express()

app.use(clerkMiddleware())
app.use(cors())
app.use(express.json())
connectDb()
const port = process.env.PORT || 3000
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/result", resultRoutes)
app.get("/", (req, res) => {
    res.send("Server is listening")
})
app.listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`)
})