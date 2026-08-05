import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app=express()


app.use(cors())
app.use(express.json())
const port =process.env.PORT||3000
app.get("/",(req,res)=>{
    res.send("Server is listening")
})
app.listen(port,()=>{
    console.log(`App is listening on port http://localhost:${port}`)
})