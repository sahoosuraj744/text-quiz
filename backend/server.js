import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { connectDb } from './config/db.js'
import userRoutes from './routes/user.js'
const app=express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
connectDb()
const port =process.env.PORT||3000
app.use("/api/users",userRoutes)
app.get("/",(req,res)=>{
    res.send("Server is listening")
})
app.listen(port,()=>{
    console.log(`App is listening on port http://localhost:${port}`)
})