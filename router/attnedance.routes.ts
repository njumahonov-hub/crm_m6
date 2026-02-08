

import {Router, type RequestHandler} from "express"
import { attendance } from "../controller/attendance.ctr.js"


const attendanceRouter: Router = Router()


attendanceRouter.get("/attendance", attendance as RequestHandler)

export default attendanceRouter