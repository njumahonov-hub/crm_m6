import {Router, type RequestHandler} from "express"
import { AddStuff, DeleteStuff, getAllStaffs, UpdateStaff } from "../controller/staff.ctr.js"


const staffRouter: Router = Router()

staffRouter.get("/get_all_staffs", getAllStaffs as RequestHandler)
staffRouter.post("/add_staff", AddStuff as RequestHandler)
staffRouter.put("/update_staff/:id", UpdateStaff as RequestHandler)
staffRouter.delete("/delete_staff/:id", DeleteStuff as RequestHandler)


export default staffRouter