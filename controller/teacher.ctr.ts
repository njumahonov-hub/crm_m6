

import type { NextFunction, Request, Response } from "express"
import { Op } from "sequelize"
import sequelize from "../config/config.js"
import type { TeacherCreateDto, TeacherUpdateDto } from "../dto/teacher.dto.js"
import { Teacher } from "../model/assocation.js"



Teacher.sync({force:false})

export const getAllTeacher = async (req:Request, res:Response, next:NextFunction) => {
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
                ]
            }
        }

        const {count, rows: teacher} = await Teacher.findAndCountAll({
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
            teacher
        })
     
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}


export const AddTeacher = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {full_name, phone_number, profession, image_url, added_by} = req.body as TeacherCreateDto
        await Teacher.create({full_name, phone_number, profession, image_url, added_by} )

        res.status(201).json({
            message: "Added teacher"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }

}

export const UpdateTeacher = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newID = Number(req.params.id )

    
        const {full_name, phone_number, profession, image_url, added_by} = req.body as TeacherUpdateDto

       
        const foundedUser = await Teacher.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Teacher.update({full_name, phone_number, profession,  image_url, added_by}, {where:{id: newID}})

        res.status(200).json({
            message: "update teacher"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const DeleteTeacher = async (req:Request, res:Response, next:NextFunction) => {
    try {
         const newID = Number(req.params.id )

       
        const foundedUser = await Teacher.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Teacher.destroy({where:{id: newID}})

        res.status(200).json({
            message: "delete teacher"
        })

    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}



