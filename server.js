import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import studentRouter from "./routes/studentRoute.js"



//app config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/", studentRouter)


app.get("/", (req, res) => {
    res.status(200).send("API WORKING") 
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
    


