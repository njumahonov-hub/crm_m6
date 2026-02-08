import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import studentRouter from "./router/students.routes.js"
import botRouter from "./router/bot.routes.js"
import staffRouter from "./router/staff.routes.js"
import groupRouter from "./router/group.routes.js"
import attendanceRouter from "./router/attnedance.routes.js"


const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
const PORT= process.env.PORT || 3000


// ROUTER
app.use(studentRouter)
app.use(botRouter)
app.use(staffRouter)
app.use(groupRouter)
app.use(attendanceRouter)

app.listen(PORT, () => {
    console.log(`server is running at: ${PORT}`);
})