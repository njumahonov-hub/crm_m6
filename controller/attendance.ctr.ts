
import type { NextFunction, Request, Response } from "express"
import { Group } from "../model/group.model.js"
import { Student } from "../model/student.model.js"
import { Attendance } from "../model/attendance.model.js"

export const attendance = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {group_id, attend} = req.body

       
        const foundedGroup = await Group.findByPk(group_id)

        if(!foundedGroup) {
            return res.status(404).json({
                message: "group not found"
            })
        }

        const currentdate = new Date().toTimeString().split(" ")[0]

        if(foundedGroup.dataValues.start_time > currentdate! || foundedGroup.dataValues.end_time < currentdate!){
            return res.status(400).json({
                message: "This time is not assign to lesson time"
            })
        }

        const list: any = []

        for (const student of attend) {
            const foundedStudent = await Student.findByPk(student.student_id)

             if(!foundedStudent) {
            return res.status(404).json({
                message: "student not found"
            })
        }

        if(student.present) {
            await Attendance.create({group_id, student_id: student.student_id, present: true})
            list.push({group_id, student_id: student.student_id, present: "kelgan"})
        } else {
            await Attendance.create({group_id, student_id: student.student_id, present: false})
            list.push({group_id, student_id: student.student_id, present: "kelmagan"})
        }

        }


        res.status(200).json(list)

    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}
