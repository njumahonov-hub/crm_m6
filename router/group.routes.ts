import {Router, type RequestHandler} from "express"
import { AddGroup, DeleteGroup, getAllGroups, UpdateGroup } from "../controller/group.ctr.js"


const groupRouter: Router = Router()

groupRouter.get("/get_all_groups", getAllGroups as RequestHandler)
groupRouter.post("/add_group", AddGroup as RequestHandler)
groupRouter.put("/update_group/:id", UpdateGroup as RequestHandler)
groupRouter.delete("/delete_group/:id", DeleteGroup as RequestHandler)


export default groupRouter