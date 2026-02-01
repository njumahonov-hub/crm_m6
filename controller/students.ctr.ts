
import type { NextFunction, Request, Response } from "express"
import { Student } from "../model/student.model.js"
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js"


Student.sync({force:false})

export const getAllStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const student = await Student.findAll()

        res.status(200).json(student)
     
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const AddStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {full_name, phone_number, profession, parent_name, parent_number, image_url} = req.body as CreateStudentDto
        await Student.create({full_name, phone_number, profession, parent_name, parent_number, image_url} )

        res.status(201).json({
            message: "Added student"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const UpdateStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newID = Number(req.params.id )

    
        const {full_name, phone_number, profession, parent_name, parent_number, image_url} = req.body as UpdateStudentDto

       
        const foundedUser = await Student.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Student.update({full_name, phone_number, profession, parent_name, parent_number, image_url}, {where:{id: newID}})

        res.status(200).json({
            message: "update student"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const DeleteStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
         const newID = Number(req.params.id )

       
        const foundedUser = await Student.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Student.destroy({where:{id: newID}})

        res.status(200).json({
            message: "delete student"
        })

    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}