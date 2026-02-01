import {Router, type RequestHandler} from "express"
import { AddStudents, DeleteStudents, getAllStudents, UpdateStudents } from "../controller/students.ctr.js"


const studentRouter: Router = Router()

studentRouter.get("/get_all_students", getAllStudents as RequestHandler)
studentRouter.post("/add_student", AddStudents as RequestHandler)
studentRouter.put("/update_student/:id", UpdateStudents as RequestHandler)
studentRouter.delete("/delete_student/:id", DeleteStudents as RequestHandler)


export default studentRouter