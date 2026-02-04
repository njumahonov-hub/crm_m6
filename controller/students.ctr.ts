
import type { NextFunction, Request, Response } from "express"
import { Student } from "../model/student.model.js"
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js"
import { Op } from "sequelize"
import sequelize from "../config/config.js"
import { group } from "node:console"


Student.sync({force:false})

export const getAllStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const offset = (page - 1) * limit

        const search = (req.query.search as string)?.trim() ?? ""

        let whereClaus = {}

        if(search){
            whereClaus = {
                [Op.or]: [
                    {full_name: {[Op.iLike]: `%${search}%`}},
                    {phone_number: {[Op.iLike]: `%${search}%`}},
                    {profession: {[Op.iLike]: `%${search}%`}},
                    {parent_name: {[Op.iLike]: `%${search}%`}}
                ]
            }
        }

        const {count, rows: students} = await Student.findAndCountAll({
            where: whereClaus,
            offset,
            limit,
            raw: true
        })


    const totalPage = Math.ceil(count/limit)


        res.status(200).json({
            totalPage,
            prev: page > 1 ? {page: page -1, limit}: undefined,
            next: totalPage > page ? {page: page + 1, limit}: undefined,
            students
        })
     
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const statistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await Student.findAll({
      attributes: [
        [
          sequelize.literal(`DATE_TRUNC('month', "joined_at")`),
          'month',
        ],
        [
          sequelize.fn('COUNT', sequelize.col('id')),
          'totalJoined',
        ],
        [
          sequelize.literal(
            `COUNT(*) FILTER (WHERE "left_at" IS NOT NULL)`
          ),
          'totalLeft',
        ],
      ],
      group: [
        sequelize.literal(`DATE_TRUNC('month', "joined_at")`) as any
      ],
      order: [
        [sequelize.literal(`DATE_TRUNC('month', "joined_at")`), 'ASC'] as any
      ],
      raw: true,
    })

    res.status(200).json(stats)
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    })
  }
}


export const AddStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {full_name, phone_number, profession, parent_name, parent_number, image_url} = req.body as CreateStudentDto
        await Student.create({full_name, phone_number, profession, parent_name, parent_number, image_url, joined_at: new Date()} )

        res.status(201).json({
            message: "Added student"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}
export const left_Students = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newID = Number(req.params.id )
       
        const foundedUser = await Student.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Student.update({ left_at: new Date()}, {where:{id: newID}})

        res.status(200).json({
            message: "update student"
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