import { Router } from "express";
import { AddStudents, DeleteStudents, getAllStudents, UpdateStudents } from "../controller/students.ctr.js";
const studentRouter = Router();
studentRouter.get("/get_all_students", getAllStudents);
studentRouter.post("/add_student", AddStudents);
studentRouter.put("/update_student/:id", UpdateStudents);
studentRouter.delete("/delete_student/:id", DeleteStudents);
export default studentRouter;
//# sourceMappingURL=students.routes.js.map